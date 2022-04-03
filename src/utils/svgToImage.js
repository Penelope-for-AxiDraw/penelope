/**
 * Simple function that converts a plain SVG string or SVG DOM Node into an image with custom dimensions.
 * 
 * @param {Object} settings The configuration object to override the default settings.
 * @see https://ourcodeworld.com/articles/read/1456/how-to-convert-a-plain-svg-string-or-svg-node-to-an-image-png-or-jpeg-in-the-browser-with-javascript
 * @returns {Promise}
 */

const svgToImage = (settings) => {
    let _settings = {
        svg: null,
        // Usually all SVG have transparency, so PNG is the way to go by default
        mimetype: 'image/png',
        quality: 0.92,
        width: 'auto',
        height: 'auto',
        outputFormat: 'base64',
        scale: 1,
    };

    // Override default settings
    for (let key in settings) { _settings[key] = settings[key]; }

    return new Promise((resolve, reject) => {
        const {
            svg, mimetype, quality, width, height, outputFormat, scale
        } = _settings;
        
        let svgNode;

        // Create SVG Node if a plain string has been provided
        if (typeof (svg) == 'string') {
            // Create a non-visible node to render the SVG string
            let SVGContainer = document.createElement('div');
            SVGContainer.style.display = 'none';
            SVGContainer.innerHTML = svg;
            svgNode = SVGContainer.firstElementChild;
        } else {
            svgNode = svg;
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const svgXml = new XMLSerializer().serializeToString(svgNode);
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svgXml);

        const image = new Image();

        image.onload = () => {
            let finalWidth, finalHeight;

            // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
            if (width === 'auto' && height !== 'auto') {
                finalWidth = scale * (image.width / image.height) * height;
                // Use image original width
            } else if (width === 'auto') {
                finalWidth = scale * image.naturalWidth;
                // Use custom width
            } else {
                finalWidth = scale * width;
            }

            // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
            if (height === 'auto' && width !== 'auto') {
                finalHeight = scale * (image.height / image.width) * width;
                // Use image original height
            } else if (height === 'auto') {
                finalHeight = scale * image.naturalHeight;
                // Use custom height
            } else {
                finalHeight = scale * height;
            }

            // Define the canvas intrinsic size
            canvas.width = finalWidth;
            canvas.height = finalHeight;

            // Render image in the canvas
            context.drawImage(image, 0, 0, finalWidth, finalHeight);

            if (outputFormat == 'blob') {
                // Fullfil and Return the Blob image
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, mimetype, quality);
            } else {
                // Fullfil and Return the Base64 image
                resolve(canvas.toDataURL(mimetype, quality));
            }
        };

        // Load the SVG in Base64 to the image
        image.src = svgBase64;
    });
}

export default svgToImage;
