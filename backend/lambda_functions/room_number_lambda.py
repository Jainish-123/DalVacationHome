import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'rooms'

# Custom encoder to convert Decimal to float
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        # Parse input parameters
        body = json.loads(event['body'])
        room_number = body['room']
    except (KeyError, json.JSONDecodeError):
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps('Missing or invalid input parameters.')
        }

    # Reference the DynamoDB table
    table = dynamodb.Table(TABLE_NAME)

    try:
        # Get item from DynamoDB table
        response = table.get_item(
            Key={'room': room_number}
        )

        if 'Item' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(response['Item'], cls=DecimalEncoder)
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps(f'Room {room_number} not found.')
            }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error getting room: {e.response["Error"]["Message"]}')
        }
