import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Name of the DynamoDB table
TABLE_NAME = 'rooms'

def lambda_handler(event, context):
    # Parse the body to get the input parameters
    try:
        body = json.loads(event['body'])
        room = body['room']
        update_expression = []
        expression_attribute_names = {}
        expression_attribute_values = {}
        
        if 'agent' in body:
            update_expression.append("#a = :agent")
            expression_attribute_names['#a'] = "Agent"
            expression_attribute_values[':agent'] = body['agent']
        
        if 'address' in body:
            update_expression.append("#ad = :address")
            expression_attribute_names['#ad'] = "Address"
            expression_attribute_values[':address'] = body['address']
        
        if 'amenities' in body:
            update_expression.append("#am = :amenities")
            expression_attribute_names['#am'] = "Amenities"
            expression_attribute_values[':amenities'] = body['amenities']
        
        if 'availability' in body:
            update_expression.append("#av = :availability")
            expression_attribute_names['#av'] = "Availability"
            expression_attribute_values[':availability'] = body['availability']
        
        if 'beds' in body:
            update_expression.append("#b = :beds")
            expression_attribute_names['#b'] = "Beds"
            expression_attribute_values[':beds'] = body['beds']
        
        if 'price' in body:
            update_expression.append("#p = :price")
            expression_attribute_names['#p'] = "Price"
            expression_attribute_values[':price'] = body['price']
        
        if not update_expression:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    'Access-Control-Allow-Credentials': True
                },
                'body': json.dumps('No fields to update.')
            }

        update_expression = "SET " + ", ".join(update_expression)
    except KeyError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps(f'Missing parameter: {e}')
        }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps('Invalid JSON in body.')
        }

    # Reference the DynamoDB table
    table = dynamodb.Table(TABLE_NAME)

    try:
        # Update item in DynamoDB table
        response = table.update_item(
            Key={
                'room': room
            },
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW",
            ConditionExpression="attribute_exists(room)"
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps(f'Room {room} updated successfully. {response["Attributes"]}')
        }
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    'Access-Control-Allow-Credentials': True
                },
                'body': json.dumps(f'Room {room} not found.')
            }
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps(f'Error updating room: {e.response["Error"]["Message"]}')
        }
