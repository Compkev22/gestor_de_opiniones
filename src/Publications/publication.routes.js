import { Router } from 'express';
import { 
    createPublication, 
    getPublications, 
    getPublicationById, 
    updatePublication, 
    deletePublication 
} from './publication.controller.js';
import { 
    createPublicationValidator, 
    publicationIdValidator, 
    updateDeletePublicationValidator 
} from '../../middlewares/publication-validators.js';

const router = Router();

router.post('/', createPublicationValidator, createPublication);

router.get('/', getPublications);

router.get('/:id', publicationIdValidator, getPublicationById);

router.put('/:id', updateDeletePublicationValidator, updatePublication);

router.delete('/:id', updateDeletePublicationValidator, deletePublication);

export default router;