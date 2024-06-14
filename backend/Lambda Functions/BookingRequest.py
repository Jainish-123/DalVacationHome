import json
import boto3
import os
import hashlib

sqs = boto3.client('sqs')
QUEUE_URL = os.environ['QUEUE_URL']

def lambda_handler(event, context):
    try:
        if 'body' not in event:
            raise ValueError("Missing 'body' in the event")
        booking_details = json.loads(event['body'])
        required_fields = ['booking_id', 'email', 'details']
        for field in required_fields:
            if field not in booking_details:
                raise ValueError(f"Missing required field: {field}")
        message_group_id = "bookingRequestGroup"
        message_deduplication_id = hashlib.md5(json.dumps(booking_details).encode('utf-8')).hexdigest()

        response = sqs.send_message(
            QueueUrl=QUEUE_URL,
            MessageBody=json.dumps(booking_details),
            MessageGroupId=message_group_id,
            MessageDeduplicationId=message_deduplication_id
        )
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Booking details added to the queue',
                'messageId': response['MessageId']
            })
        }
    except ValueError as ve:
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': str(ve)
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'An error occurred',
                'details': str(e)
            })
        }
