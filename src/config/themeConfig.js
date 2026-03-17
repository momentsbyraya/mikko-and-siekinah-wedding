// Theme Configuration - Easy to customize colors
export const themeConfig = {
    // Background Colors (Burgundy palette)
    backgrounds: {
        primary: 'bg-gray-900',        // Main dark background
        secondary: 'bg-gray-800',      // Secondary dark background (modals, cards)
        accent: 'bg-[#800020]',        // Accent background (Burgundy)
        light: 'bg-white/50',          // Light overlay backgrounds
        theme: 'bg-[#dee5ed]',        // Custom theme color
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat', // Crumpled paper background
    },

    // Text Colors (Burgundy palette)
    text: {
        primary: 'text-[#800020]',     // Main heading text color (Burgundy)
        secondary: 'text-gray-300',    // Subheading and body text color
        accent: 'text-[#800020]',      // Accent text color (Burgundy)
        muted: 'text-gray-400',        // Muted text color (icons, small text)
        dark: 'text-wedding-800',      // Dark text for light backgrounds
        theme: 'text-[#722F37]',      // Custom theme text color (Dusty burgundy)
        pause: 'text-[#dcdcdc]',      // Pause button text color
        custom: 'text-[#44484d]',     // Custom text color
    },

    // Border Colors (Burgundy palette)
    borders: {
        primary: 'border-gray-700',    // Main border color
        secondary: 'border-gray-600',  // Secondary border color
        accent: 'border-wedding-300',  // Accent border color
        theme: 'border-[#722F37]',    // Custom theme border color (Dusty burgundy)
    },

    // Button Colors (Burgundy palette)
    buttons: {
        primary: 'bg-[#800020] hover:bg-[#600018]',  // Primary button (Burgundy)
        secondary: 'border border-gray-600 hover:border-gray-400', // Secondary button
        text: 'text-gray-300 hover:text-white', // Button text color
        theme: 'bg-[#722F37] hover:bg-[#722F37]/80', // Custom theme button (Dusty burgundy)
    },

    // Hover Effects (Burgundy palette)
    hover: {
        primary: 'hover:bg-[#600018]',     // Primary button hover (Dark Burgundy)
        secondary: 'hover:border-gray-400 hover:text-white', // Secondary button hover
        theme: 'hover:bg-[#722F37]/80',     // Custom theme hover
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration (Burgundy palette)
    calendar: {
        weddingDate: '2026-05-27',          // Wedding date (YYYY-MM-DD format)
        highlightColor: 'bg-[#7B4B4B]',     // Color for wedding date highlight (Muted burgundy)
        heartColor: 'text-[#7B4B4B]',      // Color for heart icon
        textColor: 'text-gray-700',         // Calendar text color
        headerColor: 'text-gray-800',       // Month header color
        dayNamesColor: 'text-gray-600',     // Day names color
        background: 'bg-[#7B4B4B]',        // Calendar background color
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-[#f4f5ef]',         // Paragraph background color
    },

    // Custom CSS Variables (Burgundy palette)
    cssVariables: {
        '--primary-bg': '#111827',           // #111827 (gray-900)
        '--secondary-bg': '#1f2937',        // #1f2937 (gray-800)
        '--accent-bg': '#800020',           // Burgundy
        '--accent-hover': '#600018',        // Dark Burgundy (Hover)
        '--primary-text': '#800020',        // Burgundy
        '--secondary-text': '#d1d5db',      // #d1d5db (gray-300)
        '--accent-text': '#800020',         // Burgundy
        '--muted-text': '#9ca3af',          // #9ca3af (gray-400)
        '--border-color': '#9B7B7B',        // Burgundy-tinted border
        '--custom-theme': '#722F37',        // Dusty burgundy
    }
}

// Quick color presets for different themes
export const themePresets = {
    // Dark Elegant (Burgundy)
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-[#800020]',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-[#800020]',
        }
    },

    // Light Romantic
    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },

    // Warm Autumn
    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    }
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
} 