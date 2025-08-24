// Simple in-memory store for demo purposes
// In production, replace this with a proper database
const userDocuments = new Map(); // userId -> { documentId, collectionName, createdAt }

export const storeUserDocument = (userId, documentId, collectionName) => {
    if (!userDocuments.has(userId)) {
        userDocuments.set(userId, []);
    }
    const documents = userDocuments.get(userId);
    documents.push({
        documentId,
        collectionName,
        createdAt: new Date()
    });
    return documents[documents.length - 1];
};

export const getUserDocuments = (userId) => {
    return userDocuments.get(userId) || [];
};

export const getActiveCollection = (userId) => {
    const documents = userDocuments.get(userId) || [];
    // Return the most recent document's collection
    return documents.length > 0 ? documents[documents.length - 1].collectionName : null;
};
