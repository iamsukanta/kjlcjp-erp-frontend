// components/modals/BaseModal.tsx
import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-auto">
        <DialogPanel className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-xl font-bold mb-4">{title}</DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BaseModal;
