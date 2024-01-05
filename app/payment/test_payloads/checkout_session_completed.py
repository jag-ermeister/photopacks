def get_checkout_session_completed_payload(order):
    return {
        "api_version": "2023-10-16",
        "created": 1704412035,
        "data": {
            "object": {
                "after_expiration": None,
                "allow_promotion_codes": None,
                "amount_subtotal": 1997,
                "amount_total": 1997,
                "automatic_tax": {
                    "enabled": True,
                    "status": "complete"
                },
                "billing_address_collection": None,
                "cancel_url": "http://localhost:3000/upload/aeffd523-96a5-43b9-8610-7df447a77a24?canceled=true",
                "client_reference_id": None,
                "client_secret": None,
                "consent": None,
                "consent_collection": None,
                "created": 1704412009,
                "currency": "usd",
                "currency_conversion": None,
                "custom_fields": [],
                "custom_text": {
                    "after_submit": None,
                    "shipping_address": None,
                    "submit": None,
                    "terms_of_service_acceptance": None
                },
                "customer": None,
                "customer_creation": "if_required",
                "customer_details": {
                    "address": {
                        "city": "Arvada",
                        "country": "US",
                        "line1": "6468 Xavier Street",
                        "line2": None,
                        "postal_code": "80003",
                        "state": "CO"
                    },
                    "email": "jeremy.gustine@gmail.com",
                    "name": "Joe Shmo",
                    "phone": None,
                    "tax_exempt": "none",
                    "tax_ids": []
                },
                "customer_email": None,
                "expires_at": 1704498409,
                "id": "cs_test_b1dVlBteRX7Iy6FTja5Q6gFt0v5eKgr17J25kiEy4h6Wqswy7OJIJhNsQQ",
                "invoice": None,
                "invoice_creation": {
                    "enabled": False,
                    "invoice_data": {
                        "account_tax_ids": None,
                        "custom_fields": None,
                        "description": None,
                        "footer": None,
                        "metadata": {},
                        "rendering_options": None
                    }
                },
                "livemode": False,
                "locale": None,
                "metadata": {
                    "order_id": str(order.id),
                    "user_id": "12"
                },
                "mode": "payment",
                "object": "checkout.session",
                "payment_intent": "pi_3OV0d3BjziskE6YN09rG1xTG",
                "payment_link": None,
                "payment_method_collection": "if_required",
                "payment_method_configuration_details": None,
                "payment_method_options": {},
                "payment_method_types": [
                    "card"
                ],
                "payment_status": "paid",
                "phone_number_collection": {
                    "enabled": False
                },
                "recovered_from": None,
                "setup_intent": None,
                "shipping_address_collection": None,
                "shipping_cost": None,
                "shipping_details": None,
                "shipping_options": [],
                "status": "complete",
                "submit_type": None,
                "subscription": None,
                "success_url": "http://localhost:3000/upload/aeffd523-96a5-43b9-8610-7df447a77a24?success=true",
                "total_details": {
                    "amount_discount": 0,
                    "amount_shipping": 0,
                    "amount_tax": 0
                },
                "ui_mode": "hosted",
                "url": None
            }
        },
        "id": "evt_1OV0d5BjziskE6YN9uuvK0ku",
        "livemode": False,
        "object": "event",
        "pending_webhooks": 3,
        "request": {
            "id": None,
            "idempotency_key": None
        },
        "type": "checkout.session.completed"
    }
