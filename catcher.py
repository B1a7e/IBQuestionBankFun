import requests
from bs4 import BeautifulSoup
import json

url = ''
base_url = ''

# Send a request to the webpage with UTF-8 encoding
response = requests.get(url)
response.encoding = 'utf-8'  # Set encoding to UTF-8 to handle special characters
response.raise_for_status()  # Check for request errors

# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the list of questions
question_list = soup.select('div.module > ul > li')  # Selects all <li> items under the specified hierarchy

# Prepare data for JSON
data = []

# Loop through each <li> and extract marker, href, and text
for item in question_list:
    marker = item.get_text(strip=True).split(':')[0]  # Extract the marker (e.g., "EXE.1A.SL.TZ0.9")
    
    # Find the <a> tag within <li>
    link_tag = item.find('a', href=True)
    if link_tag:
        # Modify the href link by replacing '..' with base_url
        href = link_tag['href'].replace('..', base_url)
        text = link_tag.get_text(strip=True)  # Extract the question preview text

        # Add to data list as a dictionary
        data.append({
            'marker': marker,
            'link': href,
            'text': text
        })

# Write data to a JSON file with UTF-8 encoding
with open('questions.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)  # ensure_ascii=False allows special characters in JSON

print("Data successfully written to questions.json")
