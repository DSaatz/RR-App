import requests
import os
from dotenv import load_dotenv

imgur_client_id = os.getenv('IMGUR_CLIENT_ID')

def upload_image_to_imgur(image_path):
    """
    Upload an image to Imgur.
    
    Args:
        image_path (str): The file path to the image to be uploaded.

    Returns:
        str: The link to the uploaded image.
    """
    headers = {'Authorization': f'Client-ID {imgur_client_id}'}
    with open(image_path, 'rb') as img:
        data = {'image': img.read()}
        response = requests.post('https://api.imgur.com/3/image', headers=headers, data=data)

    if response.status_code == 200:
        return response.json()['data']['link']
    else:
        raise Exception(f"Error uploading image: {response.content}")

def create_album(title):
    """
    Create an album on Imgur.
    
    Args:
        title (str): The title of the album.

    Returns:
        str: The ID of the created album.
    """
    headers = {'Authorization': f'Client-ID {imgur_client_id}'}
    data = {'title': title}
    response = requests.post('https://api.imgur.com/3/album', headers=headers, json=data)

    if response.status_code == 200:
        return response.json()['data']['id']
    else:
        raise Exception(f"Error creating album: {response.content}")

def add_image_to_album(album_id, image_link):
    """
    Add an image to an existing album.
    
    Args:
        album_id (str): The ID of the album.
        image_link (str): The link to the image to be added.

    Returns:
        None
    """
    headers = {'Authorization': f'Client-ID {imgur_client_id}'}
    data = {'ids': [image_link.split('/')[-1]]}
    response = requests.post(f'https://api.imgur.com/3/album/{album_id}/add', headers=headers, json=data)

    if response.status_code != 200:
        raise Exception(f"Error adding image to album: {response.content}")

def upload_images_and_create_album(image_paths, album_title):
    """
    Upload multiple images and create an album with the images.

    Args:
        image_paths (list of str): List of file paths to the images to be uploaded.
        album_title (str): The title of the album.

    Returns:
        str: The link to the created album.
    """
    album_id = create_album(album_title)
    image_links = []

    for image_path in image_paths:
        image_link = upload_image_to_imgur(image_path)
        image_links.append(image_link)
        add_image_to_album(album_id, image_link)

    return f"https://imgur.com/a/{album_id}"