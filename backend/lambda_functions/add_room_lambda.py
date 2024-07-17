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
        address = event['address']
        amenities = event['amenities']
        availability = event['availability']
        beds = event['beds']
        room = event['room']
        price = event['price']
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Missing parameter: {e}')
        }

    # Reference the DynamoDB table
    table = dynamodb.Table(TABLE_NAME)

    # Item to be inserted
    item = {
        'Agent': agent,
        'Address': address,
        'Amenities': amenities,
        'Availability': availability,
        'Beds': beds,
        'room': room,
        'Price': price
    }

    try:
        # Put item into DynamoDB table
        table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps(f'Room {room} added successfully.')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error adding room: {e.response["Error"]["Message"]}')
        }
