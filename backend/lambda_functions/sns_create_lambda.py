import boto3
import json

def lambda_handler(event, context):
    sns_client = boto3.client('sns')
    
    topic_name = 'my-new-sns-topic'
    email_address = 'recipient@example.com'
    
    response = sns_client.create_topic(Name=topic_name)
    topic_arn = response['TopicArn']
    
    subscribe_response = sns_client.subscribe(
        TopicArn=topic_arn,
        Protocol='email',
        Endpoint=email_address
    )
    

    return {
        'statusCode': 200,
        'body': json.dumps({
            'TopicArn': topic_arn,
            'SubscriptionArn': subscribe_response['SubscriptionArn']
        })
    }

event = {}
context = {}

