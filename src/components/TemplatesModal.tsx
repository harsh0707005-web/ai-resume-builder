import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { X, Sparkles } from "lucide-react";

interface Template {
  _id?: string;
  name: string;
  description: string;
  color: string;
  layout: string;
}

interface TemplatesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: Template) => void;
}

export function TemplatesModal({ open, onOpenChange, onSelectTemplate }: TemplatesModalProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchTemplates();
    }
  }, [open]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/templates");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Failed to fetch templates", error);
      // Use default templates
      setTemplates([
        { name: "Modern", description: "Clean and modern design", color: "#4f46e5", layout: "modern" },
        { name: "Classic", description: "Traditional black and white", color: "#000000", layout: "classic" },
        { name: "Creative", description: "Colorful and creative", color: "#9333ea", layout: "creative" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedLayout(template.layout);
    onSelectTemplate(template);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <Dialog.Title className="text-2xl font-black text-slate-900">
                  Choose Your Template
                </Dialog.Title>
                <p className="text-slate-600 mt-1">Select a template style for your resume</p>
              </div>
              <Dialog.Close asChild>
                <button className="rounded-full p-1 hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </Dialog.Close>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.button
                    key={template.layout}
                    onClick={() => handleSelectTemplate(template)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedLayout === template.layout
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    {/* Template Preview */}
                    <div className="mb-4 h-40 rounded-lg opacity-80 flex items-center justify-center" style={{ backgroundColor: `${template.color}22` }}>
                      <div className="w-24 h-32 rounded bg-white/80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-6 h-1 bg-slate-300 mb-2 rounded"></div>
                          <div className="w-6 h-1 bg-slate-300 mb-2 rounded"></div>
                          <div className="w-4 h-1 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: template.color }}
                        ></div>
                        <span className="text-xs text-slate-500">{template.color}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
