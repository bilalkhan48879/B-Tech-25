const API_KEY = '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';

// Function to generate images from text input
async function generateImages() {
    const description = document.getElementById('description').value;

    if (!description) {
        alert('Please enter a description to generate images.');
        return;
    }

    try {
        let spiner = document.getElementById('spiny');
        let imageContainer = document.querySelector('#image-container');
        
        // Clear previous images and show spinner
        imageContainer.innerHTML = ''; // Clear existing images
        spiner.style.display = 'flex'; // Show spinner while images are generating

        // Generate four different images
        const imagePromises = Array(6).fill().map(() => query({ "inputs": description }));
        const imageBlobs = await Promise.all(imagePromises);
        const imageUrls = imageBlobs.map(blob => URL.createObjectURL(blob));

        displayImages(imageUrls, '#image-container');

        spiner.style.display = 'none'; // Hide spinner after images are generated
      
    } catch (error) {
        console.error('Error generating images:', error);
        alert('Failed to generate images. Please check the console for details.');
        let spiner = document.getElementById('spiny');
        spiner.style.display = 'none'; // Ensure spinner is hidden in case of error
    }
}

// Function to query the API
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                ...data,
                "seed": Math.floor(Math.random() * 1000000) // Example of adding randomness
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.blob();
    return result;
}

// Function to display generated images
function displayImages(imageUrls, containerId) {
    const imageContainer = document.querySelector(containerId);
    imageContainer.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
            ${imageUrls.map((url, index) => `
                <div style="position: relative; display: inline-block;">
                    <img src="${url}" alt="Generated Image ${index + 1}" class="generated-image" id="im-result-${index}">
                    <div class="overlay-text" id="overlay-text-${index}">BT Apps And Technologies</div>
                    <div>
                        <button onclick="saveImage(${index}, true)">Download Image ${index + 1} with Watermark</button>
                        <button onclick="saveImage(${index}, false)">Download Image ${index + 1} without Watermark</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to save the image
function saveImage(index, includeText) {
    const image = document.getElementById(`im-result-${index}`);
    const overlayText = document.getElementById(`overlay-text-${index}`);

    if (!image) {
        console.error(`Element with id "im-result-${index}" not found.`);
        return;
    }

   // Create a temporary container to hold both the image and the watermark text
const captureContainer = document.createElement('div');
captureContainer.style.position = 'relative';
captureContainer.style.display = 'inline-block';
captureContainer.style.width = image.width + 'px';
captureContainer.style.height = image.height + 'px';

// Append the image and watermark text to the temporary container
captureContainer.appendChild(image.cloneNode());

// Clone the watermark text and adjust its styling
const watermark = overlayText.cloneNode(true);
watermark.style.position = 'absolute';
watermark.style.bottom = '10px'; // Position watermark 10px from the bottom
watermark.style.left = '10px';   // Position watermark 10px from the left
watermark.style.visibility = includeText ? 'visible' : 'hidden';

// Append the watermark to the container
captureContainer.appendChild(watermark);

// Temporarily add the container to the body to capture it
document.body.appendChild(captureContainer);

html2canvas(captureContainer, {
    backgroundColor: null, // Ensures no background is added
    scale: 2, // Increases scale for HD quality
    useCORS: true, // Allows for cross-origin images
    logging: true // Enable logging to troubleshoot issues
}).then(canvas => {
    if (!canvas) {
        console.error('Failed to create canvas.');
        return;
    }

    const imgData = canvas.toDataURL('image/png');
    if (!imgData) {
        console.error('Failed to get image data from canvas.');
        return;
    }

    const link = document.createElement('a');
    link.href = imgData;
    link.download = includeText ? `BT_Text_To_Image_${index + 1}.png` : `BT_Image_${index + 1}.png`;
    document.body.appendChild(link); // Append link to body
    link.click();
    document.body.removeChild(link); // Remove link from body

    // Remove the temporary container from the body
    document.body.removeChild(captureContainer);
}).catch(error => {
    console.error('Error generating image:', error);
    document.body.removeChild(captureContainer); // Ensure temporary container is removed
});

}

// Spinner function
function spin() {
    var spiner = document.getElementById('spiny');
    const description = document.getElementById('description').value;
    if (description) {
        spiner.style.display = 'flex';
    }
}
