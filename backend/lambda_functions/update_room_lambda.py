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
        room = event['room']
        update_expression = []
        expression_attribute_names = {}
        expression_attribute_values = {}
        
        if 'agent' in event:
            update_expression.append("#a = :agent")
            expression_attribute_names['#a'] = "Agent"
            expression_attribute_values[':agent'] = event['agent']
        
        if 'address' in event:
            update_expression.append("#ad = :address")
            expression_attribute_names['#ad'] = "Address"
            expression_attribute_values[':address'] = event['address']
        
        if 'amenities' in event:
            update_expression.append("#am = :amenities")
            expression_attribute_names['#am'] = "Amenities"
            expression_attribute_values[':amenities'] = event['amenities']
        
        if 'availability' in event:
            update_expression.append("#av = :availability")
            expression_attribute_names['#av'] = "Availability"
            expression_attribute_values[':availability'] = event['availability']
        
        if 'beds' in event:
            update_expression.append("#b = :beds")
            expression_attribute_names['#b'] = "Beds"
            expression_attribute_values[':beds'] = event['beds']
        
        if 'price' in event:
            update_expression.append("#p = :price")
            expression_attribute_names['#p'] = "Price"
            expression_attribute_values[':price'] = event['price']
        
        if not update_expression:
            return {
                'statusCode': 400,
                'body': json.dumps('No fields to update.')
            }

        update_expression = "SET " + ", ".join(update_expression)
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Missing parameter: {e}')
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
            'body': json.dumps(f'Room {room} updated successfully. {response["Attributes"]}')
        }
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            return {
                'statusCode': 404,
                'body': json.dumps(f'Room {room} not found.')
            }
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error updating room: {e.response["Error"]["Message"]}')
        }
