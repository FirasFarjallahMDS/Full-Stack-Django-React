from django.test import TestCase

import openai
openai.api_key = "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"

response = openai.ChatCompletion.create(model="gpt-4o-mini",messages=[{"role": "user", "content": "Hello, how are you?"}],max_tokens=100)
print(response)
