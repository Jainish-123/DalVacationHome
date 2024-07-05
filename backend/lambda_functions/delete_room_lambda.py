import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Name of the DynamoDB table
TABLE_NAME = 'rooms'

def lambda_handler(event, context):
    # Parse input parameters
    try:
        agent = event['agent']
        room = event['room']
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Missing parameter: {e}')
        }

    # Reference the DynamoDB table
    table = dynamodb.Table(TABLE_NAME)

    try:
        # Delete item from DynamoDB table
        response = table.delete_item(
            Key={
                'room': room
            }
        )
        if 'Attributes' in response:
            return {
                'statusCode': 200,
                'body': json.dumps(f'Room {room} removed successfully.')
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps(f'Room {room} not found.')
            }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error removing room: {e.response["Error"]["Message"]}')
        }
