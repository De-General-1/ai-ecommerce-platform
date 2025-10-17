# Presigned URL Upload Flow

This document explains the implemented presigned URL upload flow for product images in the AI eCommerce Platform.

## Flow Overview

1. **User uploads images** in the Smart Data Collection component
2. **Presigned URL generation** via `/api/upload-url` endpoint
3. **Direct S3 upload** using the presigned URL
4. **Campaign generation** with the uploaded image key

## Implementation Details

### 1. Presigned URL Generation

**Endpoint**: `POST /api/upload-url`

**Request**:
```json
{
  "filename": "product-image.jpg",
  "filetype": "image/jpeg",
  "description": "Product image for campaign generation",
  "category": "product",
  "platform": "web"
}
```

**Response**:
```json
{
  "uploadUrl": "https://s3.amazonaws.com/bucket/presigned-url",
  "imageHash": "unique-hash-identifier",
  "imageKey": "uploads/product-image.jpg",
  "uploadId": "upload-session-id",
  "expiresIn": 3600,
  "requiredHeaders": {}
}
```

### 2. S3 Upload Process

The client uses the presigned URL to upload directly to S3:

```javascript
await fetch(uploadUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': file.type,
    ...requiredHeaders
  },
  body: file
})
```

### 3. Campaign Generation

Once uploaded, the image key is passed to the campaign generation API:

**For Comprehensive Campaigns** (when images are provided):
```json
{
  "product": {
    "name": "Product Name",
    "description": "Product description"
  },
  "goal": "brand-awareness",
  "target_audience": "young professionals aged 25-35",
  "budget": 3000,
  "region": "North America",
  "s3_image_key": "uploads/product-image.jpg"
}
```

## Key Components

### API Client (`lib/api-client.ts`)
- `getPresignedUrl()` - Requests presigned URL from Next.js API
- `uploadToS3()` - Uploads file directly to S3
- `uploadFile()` - Complete upload flow

### Upload Route (`app/api/upload-url/route.ts`)
- Forwards requests to AWS API Gateway
- Handles response formatting
- Provides error handling

### Campaign Flow (`lib/queries.ts`)
- `useFullCampaignFlow()` - Handles upload + campaign generation
- Progress tracking for UI feedback
- Error handling and recovery

### UI Components
- `SmartDataCollection` - File upload interface
- `AICollaborationProcessing` - Progress tracking
- Upload progress and status feedback

## Usage Example

Based on the example requests, here's how to use the endpoints:

```bash
# 1. Generate a comprehensive campaign (will trigger image analysis if s3_image_key provided)
curl -X POST "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev/api/comprehensive-campaign" \
  -H "Content-Type: application/json" \
  -d '{
    "product": {
      "name": "SmartFit Tracker",
      "description": "Advanced fitness tracking watch with AI coaching"
    },
    "goal": "brand-awareness",
    "target_audience": "fitness enthusiasts aged 20-40",
    "budget": 8000,
    "region": "Global",
    "s3_image_key": "uploads/smartfit-tracker.jpg"
  }'

# 2. Check campaign status
curl -X GET "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev/api/campaigns/{campaign_id}/status"
```

## Error Handling

The flow includes comprehensive error handling:

- **Upload failures**: Retry mechanism and user feedback
- **API errors**: Detailed error messages and logging
- **Network issues**: Timeout handling and recovery
- **Invalid files**: Type and size validation

## Security Considerations

- Presigned URLs expire after 1 hour
- File type validation on both client and server
- Size limits enforced
- Secure S3 bucket configuration required

## Testing

Use the provided test script to verify the flow:

```javascript
// In browser console
await testUploadFlow()
await testCampaignWithImage('uploads/test-image.jpg')
```