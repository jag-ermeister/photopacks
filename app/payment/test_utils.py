import requests
import stripe
import time
import os

DUMMY_WEBHOOK_PAYLOAD = """{
  "id": "evt_test_webhook",
  "object": "event"
}"""

DUMMY_WEBHOOK_SECRET = "whsec_test_secret"


def generate_header(**kwargs):
    timestamp = kwargs.get("timestamp", int(time.time()))
    payload = kwargs.get("payload", DUMMY_WEBHOOK_PAYLOAD)
    secret = kwargs.get("secret", DUMMY_WEBHOOK_SECRET)
    scheme = kwargs.get("scheme", stripe.WebhookSignature.EXPECTED_SCHEME)
    signature = kwargs.get("signature", None)
    if signature is None:
        payload_to_sign = "%d.%s" % (timestamp, payload)
        signature = stripe.WebhookSignature._compute_signature(payload_to_sign, secret)
    header = "t=%d,%s=%s" % (timestamp, scheme, signature)
    return header


def send_webhook_request(live_server, payload_json):
    return requests.post(
        f"{live_server.url}/app/stripe/webhook",
        headers={
            "Stripe-Signature": generate_header(
                payload=payload_json, secret=DUMMY_WEBHOOK_SECRET
            ),
            "Content-Type": "application/json",
        },
        data=payload_json,
    )
