import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, MousePointer, Hand, Square, Circle, Diamond, Triangle,
    Minus, ArrowRight, Type, StickyNote, Trash2, Undo, Redo, ZoomIn, ZoomOut,
    HelpCircle, X, Download, Share2, MoreHorizontal
} from 'lucide-react';

const Brainstorm = () => {
    const { id } = useParams();
    const canvasRef = useRef(null);
    const [tool, setTool] = useState('select');
    const [shapes, setShapes] = useState([
        { id: 1, type: 'sticky', x: 100, y: 100, width: 180, height: 150, color: '#BFB3FD', text: 'Ideas here' },
        { id: 2, type: 'sticky', x: 320, y: 100, width: 180, height: 180, color: '#BFB3FD', text: 'Tech Stack:\n- Flutter\n- React Native' },
        { id: 3, type: 'sticky', x: 540, y: 100, width: 180, height: 200, color: '#f0f0f0', text: 'Back End (Tech Stack):\nDatabase:\n• MongoDB\n• CockroachDB\nFramework:\n• NodeJS\n• ExpressJS' },
        { id: 4, type: 'rect', x: 760, y: 80, width: 400, height: 300, color: '#60a5fa', text: '' },
        { id: 5, type: 'sticky', x: 780, y: 100, width: 100, height: 40, color: '#f9a8d4', text: 'ADMIN' },
        { id: 6, type: 'sticky', x: 920, y: 100, width: 100, height: 40, color: '#f9a8d4', text: 'TEAM' },
        { id: 7, type: 'sticky', x: 1060, y: 100, width: 100, height: 40, color: '#f9a8d4', text: 'USER' },
        { id: 8, type: 'sticky', x: 100, y: 280, width: 180, height: 120, color: '#a78bfa', text: 'Cloud:\n• AWS\n• GCP\n• Azure' },
        { id: 9, type: 'sticky', x: 100, y: 420, width: 180, height: 80, color: '#a78bfa', text: 'Misc:\n• WhatsApp API' },
    ]);
    const [selectedId, setSelectedId] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [showHelp, setShowHelp] = useState(false);
    const [dragStart, setDragStart] = useState(null);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 'h': setTool('hand'); break;
                case 'v': setTool('select'); break;
                case 'r': setTool('rect'); break;
                case 'o': setTool('circle'); break;
                case 'd': setTool('diamond'); break;
                case 'l': setTool('line'); break;
                case 'a': setTool('arrow'); break;
                case 't': setTool('text'); break;
                case 'n': setTool('sticky'); break;
                case 'delete':
                case 'backspace':
                    if (selectedId && e.target.tagName !== 'TEXTAREA') {
                        setShapes(shapes.filter(s => s.id !== selectedId));
                        setSelectedId(null);
                    }
                    break;
                case 'escape': setSelectedId(null); break;
                case '?': setShowHelp(true); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, shapes]);

    // Handle mouse down on canvas
    const handleCanvasMouseDown = (e) => {
        if (tool === 'hand') {
            setIsPanning(true);
            setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        } else if (tool !== 'select') {
            // Create new shape
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - offset.x) / scale;
            const y = (e.clientY - rect.top - offset.y) / scale;

            const newShape = {
                id: Date.now(),
                type: tool,
                x,
                y,
                width: tool === 'sticky' ? 180 : 100,
                height: tool === 'sticky' ? 150 : 100,
                color: tool === 'sticky' ? '#BFB3FD' : '#8B5CF6',
                text: tool === 'sticky' ? 'New note' : ''
            };
            setShapes([...shapes, newShape]);
            setSelectedId(newShape.id);
            setTool('select');
        }
    };

    const handleCanvasMouseMove = (e) => {
        if (isPanning) {
            setOffset({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y
            });
        } else if (dragStart && selectedId) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - offset.x) / scale - dragStart.offsetX;
            const y = (e.clientY - rect.top - offset.y) / scale - dragStart.offsetY;

            setShapes(shapes.map(s =>
                s.id === selectedId ? { ...s, x, y } : s
            ));
        }
    };

    const handleCanvasMouseUp = () => {
        setIsPanning(false);
        setDragStart(null);
    };

    const handleShapeMouseDown = (e, shape) => {
        e.stopPropagation();
        if (tool === 'select' || tool === 'hand') {
            setSelectedId(shape.id);
            const rect = canvasRef.current.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left - offset.x) / scale;
            const mouseY = (e.clientY - rect.top - offset.y) / scale;
            setDragStart({
                offsetX: mouseX - shape.x,
                offsetY: mouseY - shape.y
            });
        }
    };

    const handleZoom = (delta) => {
        setScale(Math.min(Math.max(scale + delta, 0.25), 2));
    };

    const tools = [
        { id: 'select', icon: MousePointer, label: 'Select (V)' },
        { id: 'hand', icon: Hand, label: 'Hand (H)' },
        { id: 'rect', icon: Square, label: 'Rectangle (R)' },
        { id: 'circle', icon: Circle, label: 'Circle (O)' },
        { id: 'diamond', icon: Diamond, label: 'Diamond (D)' },
        { id: 'line', icon: Minus, label: 'Line (L)' },
        { id: 'arrow', icon: ArrowRight, label: 'Arrow (A)' },
        { id: 'text', icon: Type, label: 'Text (T)' },
        { id: 'sticky', icon: StickyNote, label: 'Sticky Note (N)' },
    ];

    const stickyColors = ['#BFB3FD', '#fbbf24', '#34d399', '#f87171', '#60a5fa', '#f9a8d4'];

    const shortcuts = [
        { key: 'V', action: 'Select mode' },
        { key: 'H', action: 'Hand/Pan mode' },
        { key: 'R', action: 'Rectangle' },
        { key: 'O', action: 'Circle/Oval' },
        { key: 'D', action: 'Diamond' },
        { key: 'L', action: 'Line' },
        { key: 'A', action: 'Arrow' },
        { key: 'T', action: 'Text' },
        { key: 'N', action: 'Sticky Note' },
        { key: 'Delete', action: 'Delete selected' },
        { key: 'Esc', action: 'Deselect' },
        { key: 'Scroll', action: 'Zoom in/out' },
        { key: 'Space + Drag', action: 'Pan canvas' },
    ];

    const renderShape = (shape) => {
        const isSelected = selectedId === shape.id;
        const baseStyle = {
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.width,
            height: shape.height,
            cursor: tool === 'select' ? 'move' : 'default',
            outline: isSelected ? '2px solid #BFB3FD' : 'none',
            outlineOffset: '2px'
        };

        switch (shape.type) {
            case 'sticky':
                return (
                    <div
                        key={shape.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: shape.color,
                            borderRadius: '4px',
                            padding: '12px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                    >
                        <textarea
                            value={shape.text}
                            onChange={(e) => setShapes(shapes.map(s =>
                                s.id === shape.id ? { ...s, text: e.target.value } : s
                            ))}
                            className="w-full h-full bg-transparent resize-none outline-none text-sm"
                            style={{ color: shape.color === '#f0f0f0' || shape.color === '#fbbf24' ? '#333' : '#1a1a1a' }}
                            placeholder="Type here..."
                        />
                    </div>
                );
            case 'rect':
                return (
                    <div
                        key={shape.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: shape.color,
                            borderRadius: '8px',
                            opacity: 0.6
                        }}
                        onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                    />
                );
            case 'circle':
                return (
                    <div
                        key={shape.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: shape.color,
                            borderRadius: '50%',
                            opacity: 0.8
                        }}
                        onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                    />
                );
            case 'diamond':
                return (
                    <div
                        key={shape.id}
                        style={{
                            ...baseStyle,
                            backgroundColor: shape.color,
                            transform: 'rotate(45deg)',
                            opacity: 0.8
                        }}
                        onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col">
            {/* Top Bar */}
            <div
                className="h-14 flex items-center justify-between px-4 border-b z-50"
                style={{
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    borderColor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="flex items-center gap-4">
                    <Link to={`/project/${id}`} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <span className="text-white font-medium">Brainstorming Board</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div
                ref={canvasRef}
                className="flex-1 overflow-hidden relative"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: `${20 * scale}px ${20 * scale}px`,
                    backgroundPosition: `${offset.x}px ${offset.y}px`,
                    cursor: tool === 'hand' ? 'grab' : 'default'
                }}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onWheel={(e) => handleZoom(e.deltaY > 0 ? -0.1 : 0.1)}
            >
                <div
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                >
                    {shapes.map(renderShape)}
                </div>

                {/* Zoom Controls */}
                <div
                    className="absolute bottom-24 right-4 flex items-center gap-1 p-1 rounded-lg"
                    style={{
                        backgroundColor: 'rgba(20, 20, 30, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <button
                        onClick={() => handleZoom(-0.1)}
                        className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-gray-400 text-sm px-2 min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
                    <button
                        onClick={() => handleZoom(0.1)}
                        className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Bottom Toolbar */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 p-2 rounded-xl z-50"
                style={{
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                }}
            >
                {tools.map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTool(t.id)}
                            className={`p-3 rounded-lg transition-all ${tool === t.id
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            title={t.label}
                        >
                            <Icon className="w-5 h-5" />
                        </button>
                    );
                })}

                <div className="w-px h-8 bg-white/10 mx-1" />

                {/* Color Picker for Sticky Notes */}
                {tool === 'sticky' && (
                    <div className="flex items-center gap-1 px-2">
                        {stickyColors.map((color) => (
                            <button
                                key={color}
                                className="w-6 h-6 rounded-full border-2 border-transparent hover:border-white/50 transition-all"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}

                <div className="w-px h-8 bg-white/10 mx-1" />

                <button
                    onClick={() => {
                        if (selectedId) {
                            setShapes(shapes.filter(s => s.id !== selectedId));
                            setSelectedId(null);
                        }
                    }}
                    className="p-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete (Del)"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Help Modal */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100]">
                    <div
                        className="w-full max-w-md p-6 rounded-2xl relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30, 30, 40, 0.98) 0%, rgba(20, 20, 30, 0.99) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <button
                            onClick={() => setShowHelp(false)}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-6">Keyboard Shortcuts</h3>

                        <div className="space-y-2">
                            {shortcuts.map((shortcut, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="text-gray-400">{shortcut.action}</span>
                                    <kbd className="px-2 py-1 rounded bg-white/5 text-white text-sm font-mono">{shortcut.key}</kbd>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Brainstorm;
