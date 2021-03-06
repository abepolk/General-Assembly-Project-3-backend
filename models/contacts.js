const {Schema, model} = require('mongoose');
const contactSchema = Schema(
    {
        owner: {type: String, required: true},
        name: {type: String, required: true},
        contactInfo: {
            phone: String,
            email: String,
            linkedinId: String,
            other: String
        },
        firstMeetContact: {
            eventName: String,
            eventDate: Date,
            otherInfo: String
        },
        followUpDate: Date,
        conversationNotes: String,
    },
    {
        timestamps: true,
        strict: "throw"
    },
);

const contact = model('Contact', contactSchema);

module.exports = contact;