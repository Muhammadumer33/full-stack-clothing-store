import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_order_email(order_details: dict):
    """
    Sends an email with order details to the admin.
    
    Args:
        order_details (dict): Dictionary containing order information.
    """
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    
    # Default to sender email if no specific recipient is configured, assuming admin notification
    receiver_email = sender_email 
    
    if not sender_email or not password:
        logger.error("Email credentials not found in .env file (EMAIL_USER, EMAIL_PASS)")
        return

    subject = f"New Order Received - Order #{order_details.get('id', 'N/A')}"
    
    # Create the email content
    body = f"""
    New Order Notification
    -----------------------
    
    Order ID: {order_details.get('id')}
    Status: {order_details.get('status')}
    
    Customer Details:
    -----------------
    Name: {order_details.get('customer_name')}
    Phone: {order_details.get('phone')}
    Email: {order_details.get('email')}
    Address: {order_details.get('address')}
    
    Product Details:
    ----------------
    Product ID: {order_details.get('product_id')}
    Product Name: {order_details.get('product_name')}
    Quantity: {order_details.get('quantity')}
    Total Price: {order_details.get('total_price')}
    Payment Method: {order_details.get('payment_method')}
    
    Please log in to the admin panel to view full details.
    """

    # Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        # Create SMTP session for sending the mail
        # Using Gmail's SMTP server by default
        session = smtplib.SMTP('smtp.gmail.com', 587) 
        session.starttls() # Enable security
        
        # Login with auth credentials
        session.login(sender_email, password) 
        
        # Send email
        text = message.as_string()
        session.sendmail(sender_email, receiver_email, text)
        session.quit()
        logger.info(f"Order email sent successfully for Order #{order_details.get('id')}")
        
    except Exception as e:
        logger.error(f"Failed to send email: {e}")

def send_contact_email(contact_details: dict):
    """
    Sends an email with contact form details to the admin.
    
    Args:
        contact_details (dict): Dictionary containing contact message information.
    """
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    
    receiver_email = sender_email 
    
    if not sender_email or not password:
        logger.error("Email credentials not found in .env file")
        return

    subject = f"New Contact Message - {contact_details.get('name')}"
    
    body = f"""
    New Contact Message Received
    ----------------------------
    
    Name: {contact_details.get('name')}
    Email: {contact_details.get('email')}
    
    Message:
    --------
    {contact_details.get('message')}
    """

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        session = smtplib.SMTP('smtp.gmail.com', 587) 
        session.starttls()
        session.login(sender_email, password) 
        
        text = message.as_string()
        session.sendmail(sender_email, receiver_email, text)
        session.quit()
        logger.info(f"Contact email sent successfully from {contact_details.get('name')}")
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {e}")
