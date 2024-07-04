import json
import boto3
import os

# Initialize the SNS and SQS clients
sns = boto3.client('sns')
sqs = boto3.client('sqs')

# Environment variables for the SNS topic ARN
SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']

def check_room_availability(room_id, check_in, check_out):
    # Implement your logic to check room availability
    # Return True if available, False otherwise
    return True

def lambda_handler(event, context):
    for record in event['Records']:
        try:
            # Extract the message body
            booking_details = json.loads(record['body'])
            
            # Extract room details
            room_id = booking_details['room_id']
            check_in = booking_details['details']['check_in']
            check_out = booking_details['details']['check_out']
            
            # Check room availability
            is_available = check_room_availability(room_id, check_in, check_out)
            
            if is_available:
                message = 'Your booking is confirmed!'
                status = 'confirmed'
            else:
                message = 'Your booking is rejected due to unavailability.'
                status = 'rejected'
            
            # Send a confirmation or rejection notification
            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Message=json.dumps({
                    'default': json.dumps({
                        'booking_id': booking_details['booking_id'],
                        'message': message,
                        'status': status,
                        'email': booking_details['email']
                    })
                }),
                MessageStructure='json'
            )
            
        except Exception as e:
            print(f"Error processing booking: {str(e)}")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Processed booking messages.')
    }
