
import { ConsultationRecord, BabalawoProfile, InventoryItem, FinancialRecord, AgendaEvent } from "../types";
import JSZip from 'jszip';

const STORAGE_KEY = 'ifa_consultations_v1';
const PROFILE_KEY = 'ifa_babalawo_profile_v1';
const INVENTORY_KEY = 'ifa_inventory_v1';
const FINANCIAL_KEY = 'ifa_financial_v1';
const AGENDA_KEY = 'ifa_agenda_v1';

export const saveConsultation = (record: ConsultationRecord): void => {
  try {
    const existing = getHistory();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save consultation", error);
  }
};

export const getHistory = (): ConsultationRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load history", error);
    return [];
  }
};

export const deleteConsultation = (id: string): void => {
    try {
        const existing = getHistory();
        const updated = existing.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error("Failed to delete", error);
    }
}

// Profile Functions

export const saveProfile = (profile: BabalawoProfile): void => {
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
        console.error("Failed to save profile", error);
    }
}

export const getProfile = (): BabalawoProfile | null => {
    try {
        const data = localStorage.getItem(PROFILE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        return null;
    }
}

// --- INVENTORY FUNCTIONS ---

export const getInventory = (): InventoryItem[] => {
    try {
        const data = localStorage.getItem(INVENTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

export const saveInventory = (items: InventoryItem[]): void => {
    try {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Failed to save inventory", error);
    }
};

export const updateInventoryItem = (item: InventoryItem): void => {
    const items = getInventory();
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
        items[index] = item;
    } else {
        items.push(item);
    }
    saveInventory(items);
};

export const deleteInventoryItem = (id: string): void => {
    const items = getInventory();
    const updated = items.filter(i => i.id !== id);
    saveInventory(updated);
}

// --- FINANCIAL FUNCTIONS ---

export const getFinancialRecords = (): FinancialRecord[] => {
    try {
        const data = localStorage.getItem(FINANCIAL_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

export const saveFinancialRecord = (record: FinancialRecord): void => {
    try {
        const records = getFinancialRecords();
        const index = records.findIndex(r => r.id === record.id);
        
        // Recalculate isFullyPaid status before saving
        const isFullyPaid = record.installments.every(i => i.status === 'paid');
        const updatedRecord = { ...record, isFullyPaid };

        if (index >= 0) {
            records[index] = updatedRecord;
        } else {
            records.unshift(updatedRecord); // Add to top
        }
        localStorage.setItem(FINANCIAL_KEY, JSON.stringify(records));
    } catch (error) {
        console.error("Failed to save financial record", error);
    }
};

export const deleteFinancialRecord = (id: string): void => {
    const records = getFinancialRecords();
    const updated = records.filter(r => r.id !== id);
    localStorage.setItem(FINANCIAL_KEY, JSON.stringify(updated));
};

// --- AGENDA FUNCTIONS (NEW) ---

export const getAgendaEvents = (): AgendaEvent[] => {
    try {
        const data = localStorage.getItem(AGENDA_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

export const saveAgendaEvent = (event: AgendaEvent): void => {
    try {
        const events = getAgendaEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) {
            events[index] = event;
        } else {
            events.push(event);
        }
        localStorage.setItem(AGENDA_KEY, JSON.stringify(events));
    } catch (error) {
        console.error("Failed to save agenda", error);
    }
};

export const deleteAgendaEvent = (id: string): void => {
    const events = getAgendaEvents();
    const updated = events.filter(e => e.id !== id);
    localStorage.setItem(AGENDA_KEY, JSON.stringify(updated));
};

// ... (previous imports)

// --- SOURCE CODE BACKUP ---

export const downloadSourceCode = async (): Promise<void> => {
    try {
        const ZipClass = (JSZip as any).default || JSZip;
        const zip = new ZipClass();
        
        // Use Vite's glob import to get all source files
        // We use query: '?raw' to get the file content as string
        // @ts-ignore
        const modules = import.meta.glob(['/src/**/*', '/public/**/*', '/index.html', '/package.json', '/tsconfig.json', '/vite.config.ts', '/tailwind.config.js', '/postcss.config.js', '/.env.example'], { query: '?raw', import: 'default' });
        
        let count = 0;
        
        for (const path in modules) {
            try {
                const content = await modules[path]();
                // Remove leading slash for zip structure if present
                const zipPath = path.startsWith('/') ? path.slice(1) : path;
                
                // Exclude sensitive or build files (just in case glob caught them)
                if (zipPath.includes('node_modules') || zipPath.includes('.git') || zipPath.includes('dist') || zipPath.endsWith('.env')) {
                    continue;
                }
                
                if (typeof content === 'string') {
                    zip.file(zipPath, content);
                    count++;
                }
            } catch (err) {
                console.warn(`Skipped file ${path}`, err);
            }
        }
        
        if (count === 0) {
            throw new Error("Nenhum arquivo de código encontrado.");
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = `IfaApp_SourceCode_${new Date().toISOString().slice(0,10)}.zip`;
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
        
    } catch (e) {
        console.error("Source backup failed", e);
        alert("Erro ao gerar backup do código fonte: " + (e as any).message);
    }
};

// ... (rest of the file)

const getBackupData = () => {
    const history = localStorage.getItem(STORAGE_KEY);
    const profile = localStorage.getItem(PROFILE_KEY);
    const inventory = localStorage.getItem(INVENTORY_KEY);
    const financial = localStorage.getItem(FINANCIAL_KEY);
    const agenda = localStorage.getItem(AGENDA_KEY);
    const settingsTheme = localStorage.getItem('ifa_theme');
    const plan = localStorage.getItem('ifa_plan');
    
    return {
        version: 1,
        timestamp: new Date().toISOString(),
        history: history ? JSON.parse(history) : [],
        profile: profile ? JSON.parse(profile) : null,
        inventory: inventory ? JSON.parse(inventory) : [],
        financial: financial ? JSON.parse(financial) : [],
        agenda: agenda ? JSON.parse(agenda) : [],
        theme: settingsTheme || 'dark',
        plan: plan || 'free'
    };
}

// Fixed ZIP Generation
export const downloadZipBackup = async (): Promise<void> => {
    try {
        // Robust instantiation for both ESM and CommonJS envs
        const ZipClass = (JSZip as any).default || JSZip;
        const zip = new ZipClass();
        
        const backupData = getBackupData();
        const jsonStr = JSON.stringify(backupData, null, 2);
        
        // Add Files
        zip.file("dados_ifa.json", jsonStr);
        zip.file("leiame.txt", `Backup Ifá Guia\nGerado em: ${new Date().toLocaleString()}\n\nPara restaurar, extraia o arquivo 'dados_ifa.json' e use a opção 'Restaurar Dados' nas Configurações do aplicativo.`);

        // Generate Zip
        const content = await zip.generateAsync({ type: "blob" });
        
        // Trigger Download
        const url = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        const fileName = `IfaBackup_${new Date().toISOString().slice(0,10)}.zip`;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

    } catch (e) {
        console.error("ZIP Generation Failed", e);
        // Fallback to simple JSON export if ZIP fails
        if (confirm("Erro ao gerar ZIP (Compressão falhou). Deseja baixar o backup como arquivo JSON simples?")) {
            exportData();
        }
    }
}

export const exportData = (): void => {
    try {
        const backupData = getBackupData();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `ifa_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    } catch (e) {
        console.error("Export failed", e);
        alert("Erro fatal ao gerar backup.");
    }
};

export const importData = (file: File): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            let jsonString = "";

            if (file.name.endsWith('.zip') || file.type === 'application/zip' || file.type === 'application/x-zip-compressed') {
                // Handle ZIP file
                const ZipClass = (JSZip as any).default || JSZip;
                const zip = new ZipClass();
                const loadedZip = await zip.loadAsync(file);
                
                // Find the JSON file
                const jsonFile = Object.values(loadedZip.files).find((f: any) => f.name.endsWith('.json') && !f.dir);
                
                if (!jsonFile) {
                    throw new Error("Nenhum arquivo JSON encontrado dentro do backup ZIP.");
                }
                
                jsonString = await (jsonFile as any).async("string");
            } else {
                // Handle regular JSON file
                jsonString = await new Promise((res, rej) => {
                    const reader = new FileReader();
                    reader.onload = (e) => res(e.target?.result as string);
                    reader.onerror = rej;
                    reader.readAsText(file);
                });
            }

            const json = JSON.parse(jsonString);
            
            // Basic validation
            if (!json.timestamp || (!json.history && !json.profile)) {
                throw new Error("Arquivo de backup inválido ou vazio.");
            }

            if (confirm(`Restaurar backup de ${new Date(json.timestamp).toLocaleDateString()}? Isso substituirá os dados atuais.`)) {
                if (json.history) localStorage.setItem(STORAGE_KEY, JSON.stringify(json.history));
                if (json.profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(json.profile));
                if (json.inventory) localStorage.setItem(INVENTORY_KEY, JSON.stringify(json.inventory));
                if (json.financial) localStorage.setItem(FINANCIAL_KEY, JSON.stringify(json.financial));
                if (json.agenda) localStorage.setItem(AGENDA_KEY, JSON.stringify(json.agenda));
                if (json.theme) localStorage.setItem('ifa_theme', json.theme);
                if (json.plan) localStorage.setItem('ifa_plan', json.plan);
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            console.error("Import failed", e);
            alert("Erro ao restaurar: " + (e as any).message);
            resolve(false);
        }
    });
};
