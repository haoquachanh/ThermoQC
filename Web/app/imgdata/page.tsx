"use client";

import { Layout } from "@/components/layout";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/utils/supabase";

const GRID_WIDTH = 32;

const temperatureData: number[] = [
  28.4, 27.0, 26.2, 28.5, 26.1, 29.9, 26.6, 26.9, 25.7, 26.2, 27.3, 25.2, 27.5,
  27.6, 26.6, 28.4, 28.7, 26.2, 27.1, 26.5, 28.0, 29.0, 28.1, 25.9, 29.8, 29.7,
  29.0, 25.6, 27.1, 27.8, 26.6, 29.5, 27.9, 26.2, 28.7, 28.4, 26.8, 29.7, 29.9,
  26.0, 25.2, 29.6, 27.0, 28.0, 29.6, 26.8, 26.1, 27.0, 28.9, 25.6, 28.3, 30.0,
  29.0, 26.5, 25.7, 29.2, 29.4, 26.0, 26.6, 29.4, 27.4, 25.3, 28.9, 26.2, 25.1,
  26.3, 27.9, 25.1, 29.1, 28.9, 26.1, 25.3, 26.0, 25.7, 29.6, 28.1, 29.9, 27.0,
  29.7, 27.8, 27.5, 28.8, 27.3, 29.3, 27.0, 26.8, 29.5, 26.7, 28.3, 26.3, 25.3,
  26.1, 25.3, 26.2, 27.5, 26.1, 26.6, 27.0, 29.9, 29.5, 33.2, 33.2, 27.0, 35.4,
  34.3, 26.4, 35.6, 32.6, 25.7, 32.6, 35.6, 28.0, 35.4, 33.2, 28.8, 33.5, 31.3,
  26.4, 27.0, 25.6, 26.5, 29.8, 25.6, 31.5, 33.6, 35.2, 27.7, 26.3, 27.4, 29.0,
  26.3, 26.9, 32.0, 35.5, 28.7, 33.0, 32.4, 29.9, 31.5, 31.6, 26.1, 35.1, 34.6,
  25.3, 34.1, 33.6, 26.0, 34.3, 34.0, 28.1, 27.5, 31.7, 34.7, 33.3, 34.5, 35.9,
  35.0, 31.0, 32.3, 28.0, 27.4, 26.9, 29.1, 28.2, 29.7, 25.9, 29.4, 26.2, 26.6,
  25.2, 25.8, 26.7, 29.5, 26.4, 28.4, 29.8, 29.8, 25.6, 27.4, 28.5, 30.0, 27.8,
  39.0, 36.1, 35.7, 43.9, 40.1, 41.6, 42.7, 34.8, 28.9, 29.0, 28.0, 27.7, 25.2,
  38.2, 38.9, 25.3, 38.1, 37.1, 26.7, 37.2, 36.8, 27.0, 35.7, 36.8, 28.5, 38.4,
  35.6, 25.1, 38.0, 35.2, 26.7, 37.1, 37.8, 35.9, 31.6, 41.0, 43.1, 44.4, 40.1,
  31.0, 27.8, 29.2, 27.3, 29.8, 26.6, 35.1, 38.8, 25.7, 35.3, 37.5, 25.3, 36.2,
  35.2, 27.5, 37.5, 36.6, 27.8, 35.5, 35.1, 27.1, 35.3, 36.6, 25.9, 27.4, 36.0,
  37.1, 35.2, 41.1, 42.4, 40.2, 40.8, 32.9, 29.9, 27.4, 29.9, 29.4, 28.7, 26.3,
  26.4, 26.8, 28.2, 28.8, 27.2, 27.9, 26.4, 26.8, 27.8, 26.0, 29.3, 29.8, 27.5,
  28.5, 28.7, 27.9, 25.5, 28.3, 28.4, 26.7, 34.5, 43.3, 40.8, 40.7, 40.3, 35.0,
  27.3, 25.3, 27.7, 27.4, 27.7, 29.3, 26.7, 28.5, 27.9, 27.8, 26.8, 26.8, 29.4,
  27.7, 30.0, 28.6, 27.4, 35.5, 37.6, 33.4, 32.2, 31.2, 25.3, 29.4, 39.0, 38.8,
  31.1, 35.7, 36.5, 34.1, 33.2, 34.1, 27.6, 28.9, 27.9, 27.1, 29.0, 25.6, 28.2,
  26.0, 28.6, 28.5, 28.4, 25.8, 26.6, 27.2, 26.3, 28.5, 28.4, 34.7, 31.7, 28.0,
  26.6, 27.6, 27.6, 28.4, 28.1, 29.9, 28.7, 36.3, 37.8, 34.3, 32.6, 29.7, 26.0,
  28.1, 25.2, 29.0, 26.1, 27.7, 29.7, 29.7, 32.3, 34.9, 29.8, 28.9, 35.9, 33.9,
  34.6, 31.4, 32.6, 32.7, 25.1, 29.7, 28.1, 27.1, 25.6, 27.2, 35.1, 37.8, 26.2,
  26.5, 25.1, 27.8, 26.1, 28.9, 27.2, 29.6, 25.2, 29.9, 26.2, 26.3, 31.7, 35.6,
  36.9, 38.2, 35.9, 25.7, 27.5, 26.9, 27.0, 26.1, 32.3, 32.1, 35.1, 33.0, 34.2,
  28.4, 26.2, 38.1, 36.0, 37.5, 27.3, 33.5, 31.1, 25.4, 25.1, 27.3, 28.0, 25.1,
  29.2, 26.7, 29.4, 27.0, 34.4, 33.1, 35.4, 36.7, 35.3, 29.2, 26.9, 28.9, 29.0,
  29.2, 34.0, 41.6, 41.7, 40.7, 29.0, 26.0, 26.9, 26.4, 37.0, 36.2, 29.3, 31.5,
  31.5, 25.9, 29.1, 27.5, 29.8, 25.8, 29.5, 25.7, 26.6, 26.4, 27.1, 29.9, 32.3,
  31.3, 27.1, 28.2, 29.8, 28.1, 29.6, 29.5, 34.6, 41.0, 44.6, 41.7, 35.7, 27.8,
  26.3, 27.8, 29.3, 28.2, 28.8, 29.9, 29.2, 27.0, 28.7, 27.0, 26.0, 28.9, 27.2,
  27.7, 38.9, 38.3, 36.2, 38.8, 36.3, 37.4, 35.3, 35.5, 38.5, 26.2, 29.2, 29.3,
  34.9, 41.7, 40.6, 40.7, 35.9, 26.2, 27.1, 27.9, 26.0, 27.3, 26.8, 25.7, 28.5,
  35.6, 27.2, 29.2, 29.5, 29.5, 29.9, 27.4, 38.6, 51.1, 53.8, 53.3, 54.2, 51.2,
  51.1, 51.8, 36.7, 29.7, 29.3, 28.1, 27.4, 31.2, 32.2, 35.3, 31.2, 37.2, 35.2,
  28.4, 26.5, 28.8, 33.6, 31.7, 35.8, 41.2, 44.1, 27.8, 29.6, 28.7, 25.8, 25.2,
  38.1, 52.0, 53.9, 53.1, 52.2, 53.3, 50.8, 50.9, 38.0, 26.0, 36.9, 26.8, 27.1,
  28.9, 26.8, 29.0, 28.4, 38.1, 37.8, 29.6, 25.5, 26.5, 32.1, 31.5, 33.0, 41.7,
  44.6, 32.8, 29.4, 28.5, 29.9, 27.5, 37.3, 52.6, 53.0, 51.1, 50.7, 53.0, 54.5,
  51.1, 37.3, 25.0, 36.3, 26.4, 28.8, 29.7, 25.2, 28.9, 28.7, 26.7, 30.0, 28.4,
  28.7, 27.9, 29.1, 27.5, 27.5, 32.5, 31.5, 29.6, 29.6, 25.1, 26.6, 29.5, 37.5,
  51.5, 54.6, 53.4, 52.5, 52.6, 50.3, 50.0, 38.5, 28.9, 38.0, 28.0, 27.3, 27.5,
  26.4, 25.1, 28.8, 26.0, 27.2, 26.6, 25.1, 27.4, 28.4, 27.1, 25.7, 25.9, 33.4,
  25.8, 28.7, 27.6, 27.8, 28.3, 38.3, 54.8, 51.4, 54.9, 54.6, 51.1, 53.6, 52.7,
  37.8, 29.9, 35.5, 26.3, 28.8, 28.4, 29.3, 25.8, 29.5, 25.7, 27.8, 28.5, 28.5,
  28.9, 26.3, 38.0, 37.9, 25.9, 29.2, 27.5, 28.6, 26.3, 28.7, 25.7, 36.9, 51.4,
  50.4, 52.3, 53.0, 50.9, 54.7, 54.6, 36.3, 29.7, 38.3, 29.6, 27.0, 29.9, 28.1,
  29.5, 28.4, 25.1, 25.9, 26.8, 25.3, 25.3, 26.8, 38.3, 38.8, 27.2, 27.7, 28.1,
  28.7, 28.8, 27.9, 25.7, 37.2, 36.5, 37.9, 37.5, 38.1, 38.5, 35.3, 35.2, 35.2,
  25.6, 27.1, 26.4, 26.3, 27.9, 25.8, 28.6, 26.9, 25.9, 25.8, 27.7, 25.3, 29.0,
  29.3, 27.9, 26.3, 38.4, 36.3, 38.6, 29.2, 26.0, 25.7, 27.5, 29.9, 27.6, 26.0,
  25.4, 28.3, 25.1, 25.3, 25.0, 25.7, 29.4, 26.0, 27.2, 28.2, 26.0, 28.9, 30.0,
  28.7, 26.0, 29.4, 28.6, 25.7, 29.8, 25.6, 26.6, 27.0, 25.6, 29.7, 28.4, 28.5,
  27.9,
];

export default function GridPage() {
  const [timestamps, setTimestamps] = useState<number[]>([]);

  const [grid, setGrid] = useState<number[]>(temperatureData);
  const [data, setData] = useState<any[]>([]);
  const [theId, setTheId] = useState<number>(0);

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [ignoredCells, setIgnoredCells] = useState<Set<string>>(new Set()); // Ô không quan trọng
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSelect, setDragStartSelect] = useState(true);

  useEffect(() => {
    async function getDataFromDB() {
      let { data: thermal_data, error } = await supabase
        .from("thermal_datas")
        .select("*");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const sorted = (thermal_data || []).sort((a, b) => a.ts - b.ts);
      setData(sorted);
      // setData(thermal_data || []);
      console.log("thermal_datas:   ", thermal_data);
    }

    getDataFromDB();
  }, []);

  // src/utils/math.ts
  // src/utils/math.ts
  function findMinMax1D(arr: number[]): { min: number; max: number } {
    let min = 100;
    let max = -50;

    for (const val of arr) {
      if (val < min) min = val;
      if (val > max) max = val;
    }

    return { min, max };
  }

  const getColorFromTemperature = (temp: number) => {
    const { min, max } = findMinMax1D(grid);
    const clamped = Math.max(min, Math.min(max, temp));
    const t = (clamped - min) / (max - min); // 0 → 1

    const h = (1 - t) * 240; // xanh (240°) → đỏ (0°)
    return `hsl(${h}, 80%, 53%)`;
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
  // src/components/ThermalGrid.tsx

  const handleToggleSelection = () => {
    setSelectedCells((prev) => {
      const newSelected = new Set(prev);
      grid.forEach((_, index) => {
        const rowIndex = Math.floor(index / GRID_WIDTH);
        const colIndex = index % GRID_WIDTH;
        const cellKey = `${rowIndex}-${colIndex}`;
        if (newSelected.has(cellKey)) {
          newSelected.delete(cellKey);
        } else {
          newSelected.add(cellKey);
        }
      });
      return newSelected;
    });
  };

  console.log("data", data);
  // Đánh dấu ô "không quan trọng"
  const handleDontCare = () => {
    setIgnoredCells(new Set(selectedCells));
    setSelectedCells(new Set()); // Bỏ chọn sau khi đánh dấu
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
          <div>
            <h2 className="text-xl font-mono text-gray-800">
              Dữ liệu ảnh nhiệt tại thời điểm:{" "}
              {data.find((item) => item.id === theId)?.ts
                ? new Date(
                    Number(data.find((item) => item.id === theId)?.ts) * 1000
                  ).toLocaleString()
                : "15:45:13 12/5/2025"}
            </h2>
            <div
              className="grid rounded border-4 border-gray-300"
              style={{
                gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(1px, 1fr))`,
              }}
            >
              {grid.map((value, index) => {
                const row = Math.floor(index / GRID_WIDTH);
                const col = index % GRID_WIDTH;
                const alpha = Math.min(Math.max((value - 25) / 30, 0), 1);

                return (
                  <div
                    key={index}
                    className="w-[1.8em] h-[1.8em] m-[0px] p-0 cursor-pointer"
                    style={{
                      backgroundColor: getColorFromTemperature(value),
                    }}
                    title={` ${value.toFixed(1)}°C`}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="ml-4">
            <p className="mt-4 text-xl text-gray-600">Chỉ số MSE</p>
            <p className="text-7xl font-bold text-gray-800 mb-8">
              {data.find((item) => item.id === theId)?.mse.toFixed(0) || 21}
            </p>
            {/* Hiển thị danh sách key */}
            <p>Xem thêm dữ liệu nhiệt tại thời điểm</p>
            <div className="mt-4 text-sm text-gray-700 max-h-80 overflow-y-auto space-y-1">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const raw = item.value.replace(/[\[\]\s]/g, "");
                    interface ThermalDataItem {
                      id: number;
                      ts: number | string;
                      value: string;
                    }
                    const numbers: number[] = raw
                      .split(",")
                      .map((v: string) => parseFloat(v));
                    setTheId(item.id);
                    setGrid(numbers);
                  }}
                  className={`px-2 py-1 rounded cursor-pointer hover:bg-gray-200 ${
                    theId === item.id ? "bg-blue-200" : "bg-gray-100"
                  }`}
                >
                  {(() => {
                    const date = new Date(Number(item.ts) * 1000);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                  })()}
                </div>
              ))}
            </div>

            {/* Nút chức năng */}
            {/* <div className="mt-4 flex flex-col gap-2">
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
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
