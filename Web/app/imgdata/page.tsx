"use client";

import { Layout } from "@/components/layout";
import { useState, useCallback, useEffect } from "react";

const GRID_WIDTH = 32;
const GRID_HEIGHT = 24;

const temperatureData: number[] = Array.from(
  { length: GRID_WIDTH * GRID_HEIGHT },
  () => Math.floor(Math.random() * 100)
);

export default function GridPage() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [ignoredCells, setIgnoredCells] = useState<Set<string>>(new Set()); // Ô không quan trọng
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSelect, setDragStartSelect] = useState(true);

  useEffect(() => {
    const initialGrid = Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () => Math.floor(Math.random() * 100))
    );
    setGrid(initialGrid);
  }, []);

  const getColorFromValue = (value: number) => {
    const minTemp = 0;
    const maxTemp = 100;
    const hue = 240 - ((value - minTemp) / (maxTemp - minTemp)) * 240;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const handleCellInteraction = useCallback(
    (row: number, col: number, isFirstCell: boolean = false) => {
      const cellKey = `${row}-${col}`;
      setSelectedCells((prev) => {
        const newSelected = new Set(prev);
        if (isFirstCell) {
          setDragStartSelect(!prev.has(cellKey));
          if (prev.has(cellKey)) {
            newSelected.delete(cellKey);
          } else {
            newSelected.add(cellKey);
          }
        } else {
          if (dragStartSelect) {
            newSelected.add(cellKey);
          } else {
            newSelected.delete(cellKey);
          }
        }
        return newSelected;
      });
    },
    [dragStartSelect]
  );

  const handleMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    handleCellInteraction(row, col, true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      handleCellInteraction(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Toggle lựa chọn ô
  const handleToggleSelection = () => {
    setSelectedCells((prev) => {
      const newSelected = new Set(prev);
      grid.forEach((row, rowIndex) =>
        row.forEach((_, colIndex) => {
          const cellKey = `${rowIndex}-${colIndex}`;
          if (newSelected.has(cellKey)) {
            newSelected.delete(cellKey);
          } else {
            newSelected.add(cellKey);
          }
        })
      );
      return newSelected;
    });
  };

  // Đánh dấu ô "không quan trọng"
  const handleDontCare = () => {
    setIgnoredCells(new Set(selectedCells));
    setSelectedCells(new Set()); // Bỏ chọn sau khi đánh dấu
  };

  // Gửi data để train
  const handleTrain = () => {
    const selectedData = Array.from(selectedCells).map((key) => {
      const [row, col] = key.split("-").map(Number);
      return { row, col, value: grid[row][col] };
    });

    console.log("Training data:", selectedData);
    alert("Training data sent! (Check console for details)");
  };

  if (grid.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <h1 className="text-2xl font-bold">Thermal Image</h1>
        <div className="max-w-fit mx-auto bg-white p-3 rounded-lg flex flex-row">
          <div
            className="grid gap-1 rounded border-4"
            style={{
              gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(20px, 1fr))`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const isSelected = selectedCells.has(cellKey);
                const isIgnored = ignoredCells.has(cellKey);

                return (
                  <div
                    key={cellKey}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    style={{
                      backgroundColor: getColorFromValue(value),
                      aspectRatio: "1",
                      cursor: "pointer",
                      userSelect: "none",
                      opacity: isIgnored ? 0.3 : 1, // Làm mờ ô bị đánh dấu "don't care"
                    }}
                    className={`rounded transition-all duration-200 hover:scale-110 ${
                      isSelected ? "ring-4 ring-blue-500" : ""
                    } ${isIgnored ? "border border-gray-500" : ""}`}
                    title={`Value: ${value}`}
                  />
                );
              })
            )}
          </div>
          <div className="ml-4">
            <p className="mt-4 text-sm text-gray-600">
              Selected cells: {selectedCells.size}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Tip: Click and drag to select multiple cells
            </p>

            {/* Nút chức năng */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleToggleSelection}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Toggle Selection
              </button>
              <button
                onClick={handleDontCare}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                {`Don't Care`}
              </button>
              <button
                onClick={handleTrain}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Train
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
