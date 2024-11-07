# How To
1. Find a IB question bank you are looking to use. Ex: `https://dl.ibdocs.re/IB%20QUESTIONBANKS/6.%20Sixth%20Edition%20-%20Group%204%202025/questionbank/en/teachers/ibdocs2/questionbanks/46-dp-physics-last-assessment-2024/syllabus_sections/2598.html`
2. That is your url, and your base url is found by removing `/syllabus_sections/2598.html` from the end. Make sure there is no `/` at the end or else the final url will generate oddly
3. Put those urls into `catcher.py` and run the file
4. Put the `questions.json` file into your google drive and find the ID. Hint: `https://drive.google.com/file/d/<FILE_ID>/view`
5. Create an AppScript in a Google Sheet by clicking `Extensions` --> `Apps Script`
6. Put the ID into `appscripts.js` and save the file
7. In A1 of a sheet, type `=importJSONtoSheet` and go back to the Apps Script and press run
8. Hopefully it works, you can also add a card dropdown by yourself in the open column
