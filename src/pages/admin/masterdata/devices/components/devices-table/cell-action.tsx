import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import DeviceUpdateForm from '../devices-form/device-update-form';
import { useToast } from '@/components/ui/use-toast';
import type { Device } from '@/types/devices';
import { destroy } from '@/api/regions';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface CellActionProps {
  device: Device;
}

export const CellAction: React.FC<CellActionProps> = ({ device }) => {
  const { toast } = useToast();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const onConfirm = async () => {
    try {
      await destroy(device.id);
      toast({
        title: 'Success',
        description: 'Region have been deleted'
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      if (error) {
        toast({
          title: 'Failed',
          description: 'Delate failed'
        });
      }
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <Modal isOpen={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DeviceUpdateForm
          modalClose={() => setOpenUpdate(false)}
          device={device}
        />
      </Modal>
      <Button
        variant="outline"
        className="mr-3 px-2 pl-2"
        onClick={() => setOpenUpdate(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        className="px-2 py-2"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
