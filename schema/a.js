module.exports = Object.freeze({
    a_schema: {
        grade: { type: String, require: true },
        area: { type: String, require: true, default: 'China' },
        name: { type: String, unique: true, require: true },
        geoLL: { type: Number },
        link: { type: String, }
    }
})