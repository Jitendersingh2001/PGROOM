const propertyService = require("../services/propertyService");

class ImageFactory {
    /**
     * Factory method to create and return the appropriate service object based on the type.
     * @param {string} type - The type of service to create (e.g., 'property').
     * @returns {*} - The corresponding service object.
     * @throws {Error} - Throws an error if the type is not recognized.
     */
    static create(type) {
        switch (type) {
            case 'property':
                return new propertyService();
            // Add more cases for other types if needed
            default:
                throw new Error(`Unknown service type: ${type}`);
        }
    }
}

module.exports = ImageFactory;