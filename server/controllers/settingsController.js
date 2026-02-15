import prisma from '../db.js';

// @desc    Get site settings
// @route   GET /api/settings/:key
// @access  Public
export const getSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const setting = await prisma.setting.findUnique({ where: { key } });
        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        res.json(JSON.parse(setting.value));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings/:key
// @access  Private (Admin/Super Admin)
export const updateSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const value = JSON.stringify(req.body);

        const setting = await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        res.json(JSON.parse(setting.value));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
