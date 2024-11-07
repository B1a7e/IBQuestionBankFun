function importJSONtoSheet() {
    const fileId = '';  // Replace with your actual file ID https://drive.google.com/file/d/<FILE_ID>/view
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Clear existing data in the sheet
    sheet.clearContents();
    
    // Set headers in the first row
    sheet.getRange(1, 1, 1, 3).setValues([['Marker', 'Chips', 'Question Text']]);

    // Fetch JSON data from Google Drive
    const file = DriveApp.getFileById(fileId);
    const jsonData = JSON.parse(file.getBlob().getDataAsString());

    // Track seen texts to avoid duplicates
    const seenTexts = new Set();
    const data = [];

    // Filter and prepare data
    jsonData.forEach(item => {
        if (!seenTexts.has(item.text)) {  // Only add if text is unique
            seenTexts.add(item.text);

            // Create a hyperlink for the marker
            const hyperlinkMarker = `=HYPERLINK("${item.link}", "${item.marker}")`; 
            
            // Leave the Chips column empty
            const chips = '';  // Empty Chips column

            // Push the data (marker, empty chips, and text)
            data.push([hyperlinkMarker, chips, item.text]);
        }
    });
    
    // Insert data starting from the second row
    sheet.getRange(2, 1, data.length, 3).setValues(data);

    SpreadsheetApp.flush();
    Logger.log("Data imported successfully");
}
