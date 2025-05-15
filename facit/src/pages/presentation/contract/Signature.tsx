/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from 'react';

interface SignatureProps {
  open: boolean;
  onClose: () => void;
  onSign: (signatureDataUrl: string) => void;
}

const Signature: React.FC<SignatureProps> = ({ open, onClose, onSign }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<string[]>([]); // ← Signature history for undo

  useEffect(() => {
    if (open && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let painting = false;

      const startPosition = (e: MouseEvent) => {
        painting = true;
        // Save current canvas snapshot
        if (canvas) {
          historyRef.current.push(canvas.toDataURL());
        }
        draw(e);
      };

      const finishedPosition = () => {
        painting = false;
        ctx?.beginPath();
      };

      const draw = (e: MouseEvent) => {
        if (!painting || !ctx) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      };

      canvas.addEventListener('mousedown', startPosition);
      canvas.addEventListener('mouseup', finishedPosition);
      canvas.addEventListener('mousemove', draw);

      return () => {
        canvas.removeEventListener('mousedown', startPosition);
        canvas.removeEventListener('mouseup', finishedPosition);
        canvas.removeEventListener('mousemove', draw);
      };
    }
  }, [open]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      historyRef.current = []; // also clear history
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const lastImage = historyRef.current.pop();
    if (lastImage && canvas && ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = lastImage;
    }
  };




  useEffect(() => {
    if (open && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let painting = false;

      const startPosition = (e: MouseEvent) => {
        painting = true;
        draw(e);
      };

      const finishedPosition = () => {
        painting = false;
        ctx?.beginPath();
      };

      const draw = (e: MouseEvent) => {
        if (!painting || !ctx) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      };

      canvas.addEventListener('mousedown', startPosition);
      canvas.addEventListener('mouseup', finishedPosition);
      canvas.addEventListener('mousemove', draw);

      return () => {
        canvas.removeEventListener('mousedown', startPosition);
        canvas.removeEventListener('mouseup', finishedPosition);
        canvas.removeEventListener('mousemove', draw);
      };
    }
  }, [open]);


  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current?.getContext('2d');
          if (canvasRef.current) {
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
          if (canvasRef.current) {
            ctx?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        };
        if (typeof reader.result === 'string') {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onSign(dataUrl);
      onClose();
    }
  };

  return (
    <>
      {open && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Signature</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Signature <span className="text-danger">*</span></label>
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={200}
                    style={{ background: 'white', border: '1px solid #ced4da', borderRadius: '5px', width: '100%' }}
                  />
                </div>
                <div className="d-flex gap-2 mb-3">
                  <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
                  <label className="btn btn-secondary mb-0">
                    Upload Signature
                    <input type="file" accept="image/*" onChange={handleUpload} hidden />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" onClick={handleUndo}>Undo</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Sign</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signature;