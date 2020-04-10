import { v1 } from 'uuid';

export const BUCKET_NAMES = ['TODO', 'IN PROGRESS', 'DONE'];

export const INITIALDATA = [
    {
        id: v1(),
        title: 'Perform Code Review',
        bucketName: 'TODO'
    },
    {
        id: v1(),
        title: 'Write Test Cases',
        bucketName: 'TODO'
    },
    {
        id: v1(),
        title: 'Optimize Code',
        bucketName: 'TODO'
    },
    {
        id: v1(),
        title: 'Design Discussion With UX Team',
        bucketName: 'IN PROGRESS'
    },
    {
        id: v1(),
        title: 'Provide Performance Review For Team',
        bucketName: 'IN PROGRESS'
    },
    {
        id: v1(),
        title: 'Refactor Code',
        bucketName: 'DONE'
    },
    {
        id: v1(),
        title: 'Meeting With Client',
        bucketName: 'DONE'
    },
    {
        id: v1(),
        title: 'Discussion With Testing Team',
        bucketName: 'DONE'
    }
];