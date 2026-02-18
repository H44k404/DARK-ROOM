import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deployFrontend = async (req, res) => {
    try {
        // Verify deployment key from header or body
        const deployKey = req.headers['x-deploy-key'] || req.body.deployKey || req.query.key;
        const expectedKey = process.env.DEPLOY_KEY || 'dark-room-deploy-2025';
        
        if (deployKey !== expectedKey) {
            return res.status(401).json({ message: 'Unauthorized: Invalid deployment key' });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Verify it's a valid zip file
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (fileExtension !== '.zip') {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Please upload a ZIP file' });
        }

        const uploadedFilePath = req.file.path;
        const extractDir = '/var/www/darkroom';

        // Create extraction directory if it doesn't exist
        if (!fs.existsSync(extractDir)) {
            fs.mkdirSync(extractDir, { recursive: true });
        }

        // Extract zip file using unzip command
        try {
            const { stdout, stderr } = await execPromise(
                `cd "${extractDir}" && unzip -o "${uploadedFilePath}" && rm "${uploadedFilePath}"`
            );
            console.log('Deployment successful:', stdout);
            
            return res.status(200).json({
                message: 'Frontend deployed successfully!',
                timestamp: new Date().toISOString()
            });
        } catch (extractError) {
            console.error('Extraction error:', extractError);
            // Fallback: Try to use Node's stream-based extraction
            const AdmZip = require('adm-zip');
            const zip = new AdmZip(uploadedFilePath);
            
            // Clear existing files
            fs.rmSync(extractDir, { recursive: true, force: true });
            fs.mkdirSync(extractDir, { recursive: true });
            
            // Extract all files
            zip.extractAllTo(extractDir, true);
            fs.unlinkSync(uploadedFilePath);
            
            return res.status(200).json({
                message: 'Frontend deployed successfully!',
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Deployment error:', error);
        
        // Clean up uploaded file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                console.error('Failed to delete uploaded file:', e);
            }
        }

        res.status(500).json({
            message: 'Deployment failed',
            error: error.message
        });
    }
};
