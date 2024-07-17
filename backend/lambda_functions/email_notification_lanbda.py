import json
import boto3
import os

# Initialize the SNS client
sns = boto3.client('sns')

# Environment variable for the SNS topic ARN
SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']

def lambda_handler(event, context):
    try:
        # Parse input parameters
        email = event.get('email')
        message = event.get('message')
        
        if not email or not message:
            raise ValueError("Missing required parameters: 'email' and 'message'")
        
        # Construct the SNS message
        sns_message = {
            'default': message
        }
        
        # Publish the message to the SNS topic
        response = sns.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=json.dumps(sns_message),
            Subject="Notification",
            MessageStructure='json',
            MessageAttributes={
                'email': {
                    'DataType': 'String',
                    'StringValue': email
                }
            }
        )
        
        return {
            'statusCode': 200,
            'isBase64Encoded': False,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'message': 'Notification sent successfully',
                'messageId': response['MessageId']
            })
        }
    
    except ValueError as ve:
        return {
            'statusCode': 400,
            'isBase64Encoded': False,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': str(ve)
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'isBase64Encoded': False,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({
                'error': 'An error occurred',
                'details': str(e)
            })
        }
