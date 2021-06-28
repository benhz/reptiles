module.exports = Object.freeze({
    a_schema: {
        grade: { type: String, require: true },
        area: {
            country: { type: String, require: true, default: 'China' },
            province: { type: String },
            city: { type: String },
        },
        name: { type: String, unique: true, require: true },
        formatted_address: { type: String },
        coordinate: {
            longitude: { type: String, default: '0' },
            latitude: { type: String, default: '0' }
        },
        link: { type: String, }
    }
})