<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Sources</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            text-align: center;
        }
        h1 {
            color: #333;
        }
        .filters {
            margin: 20px 0;
        }
        select, button {
            padding: 10px;
            margin: 5px;
            font-size: 16px;
        }
        .news-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .news-item {
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: left;
        }
        .news-item h2 {
            font-size: 18px;
            margin: 0 0 10px;
        }
        .news-item p {
            font-size: 14px;
            color: #666;
        }
        .response-container {
            margin-top: 20px;
            text-align: left;
            padding: 10px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 1000;
        }
        .response-container pre {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .close-btn {
            background: red;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>News Sources</h1>
        <div class="filters">
            <select id="category">
                <option value="">All Categories</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <select id="language">
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
            </select>
            <select id="country">
                <option value="">All Countries</option>
                <option value="us">United States</option>
                <option value="gb">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
            </select>
            <button onclick="applyFilters()">Apply Filters</button>
            <button onclick="toggleResponse()">View API Response</button>
        </div>
        <div id="news-sources" class="news-container"></div>
        <div id="api-response" class="response-container">
            <button class="close-btn" onclick="toggleResponse()">Close</button>
            <h2>API Response</h2>
            <pre id="response-content"></pre>
        </div>
    </div>
    <script>
        const apiKey = '585f8abb68f5456890f890ccb24bc8d8';
        const baseUrl = https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey};

        async function fetchNewsSources(url = baseUrl) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                displaySources(data.sources);
                document.getElementById('response-content').textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Error fetching news sources:', error);
            }
        }

        function applyFilters() {
            const category = document.getElementById('category').value;
            const language = document.getElementById('language').value;
            const country = document.getElementById('country').value;
            
            let url = baseUrl;
            if (category) url += &category=${category};
            if (language) url += &language=${language};
            if (country) url += &country=${country};
            
            fetchNewsSources(url);
        }

        function displaySources(sources) {
            const container = document.getElementById('news-sources');
            container.innerHTML = '';
            sources.forEach(source => {
                const sourceElement = document.createElement('div');
                sourceElement.classList.add('news-item');
                sourceElement.innerHTML = `
                    <h2>${source.name}</h2>
                    <p>${source.description || 'No description available'}</p>
                    <a href="${source.url}" target="_blank">Visit Source</a>
                `;
                container.appendChild(sourceElement);
            });
        }

        function toggleResponse() {
            const responseContainer = document.getElementById('api-response');
            responseContainer.style.display = responseContainer.style.display === 'none' ? 'block' : 'none';
        }

        fetchNewsSources();
    </script>
</body>
</html>
