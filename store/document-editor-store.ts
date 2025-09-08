import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignatureFieldData } from "@/components/signature-field";
import { Id } from "@/convex/_generated/dataModel";

interface Signer {
  email: string;
  name?: string;
}

interface DocumentEditorState {
  documentId: Id<"documents"> | null;
  setDocumentId: (id: Id<"documents">) => void;

  signatureFields: SignatureFieldData[];
  setSignatureFields: (fields: SignatureFieldData[]) => void;
  addSignatureField: (field: SignatureFieldData) => void;
  updateSignatureFieldInStore: (field: SignatureFieldData) => void;
  deleteSignatureFieldInStore: (id: string) => void;

  selectedFieldId: string;
  setSelectedFieldId: (id: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  signers: Signer[];
  setSigners: (signers: Signer[]) => void;
}

export const useDocumentEditorStore = create<DocumentEditorState>()(
  persist(
    (set, get) => ({
      documentId: null,
      setDocumentId: (id) => {
        if (get().documentId !== id) {
          // New document, reset the state
          set({
            documentId: id,
            signatureFields: [],
            selectedFieldId: "",
            currentPage: 1,
            signers: [],
          });
        }
      },

      signatureFields: [],
      setSignatureFields: (fields) => {
        if (JSON.stringify(get().signatureFields) !== JSON.stringify(fields)) {
          set({ signatureFields: fields });
        }
      },
      addSignatureField: (field) =>
        set((state) => ({ signatureFields: [...state.signatureFields, field] })),
      updateSignatureFieldInStore: (field) =>
        set((state) => ({
          signatureFields: state.signatureFields.map((f) =>
            f.id === field.id ? field : f,
          ),
        })),
      deleteSignatureFieldInStore: (id) =>
        set((state) => ({
          signatureFields: state.signatureFields.filter((f) => f.id !== id),
        })),

      selectedFieldId: "",
      setSelectedFieldId: (id) => set({ selectedFieldId: id }),

      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      signers: [],
      setSigners: (signers) => set({ signers }),
    }),
    {
      name: "boopsign-editor-storage",
    },
  ),
);