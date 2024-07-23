import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'booking'

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
        email = body['email']
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

    table = dynamodb.Table(TABLE_NAME)
    bookings = []
    last_evaluated_key = None

    try:
        while True:
            if last_evaluated_key:
                response = table.scan(
                    FilterExpression='#email = :email',
                    ExpressionAttributeNames={'#email': 'email'},
                    ExpressionAttributeValues={':email': email},
                    ExclusiveStartKey=last_evaluated_key
                )
            else:
                response = table.scan(
                    FilterExpression='#email = :email',
                    ExpressionAttributeNames={'#email': 'email'},
                    ExpressionAttributeValues={':email': email}
                )
            
            scanned_items = response.get('Items', [])
            print(f'Scanned {len(scanned_items)} items')
            bookings.extend(scanned_items)
            last_evaluated_key = response.get('LastEvaluatedKey')
            
            if not last_evaluated_key:
                break

        print(f'Total bookings for {email}: {len(bookings)}')

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps({'bookings': bookings}, cls=DecimalEncoder)
        }
    except ClientError as e:
        print(f'ClientError: {e.response["Error"]["Message"]}')
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error fetching bookings: {e.response["Error"]["Message"]}')
        }
    except Exception as e:
        print(f'Exception: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(f'Error: {str(e)}')
        }
