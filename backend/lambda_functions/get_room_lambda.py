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
        body = json.loads(event['body'])
        agent = body['agent']
    except (KeyError, json.JSONDecodeError):
        return {
            'statusCode': 400,
            'body': json.dumps('Missing or invalid required parameter: agent'),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            }
        }

    table = dynamodb.Table(TABLE_NAME)

    try:
        response = table.scan(
            FilterExpression='#agent = :agent',
            ExpressionAttributeNames={'#agent': 'Agent'},
            ExpressionAttributeValues={':agent': agent}
        )
        rooms = response.get('Items', [])

        return {
            'statusCode': 200,
            'body': json.dumps({'rooms': rooms}, cls=DecimalEncoder),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            }
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error fetching rooms: {e.response["Error"]["Message"]}'),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Credentials": True
            }
        }
