import {
  Apple,
  ArrowRight,
  CheckSquare,
  Grid,
  Info,
  MessageSquare,
  Skull,
  X,
} from 'lucide-react'
import React from 'react'

const transformValues = [
  { height: 0, transformY: -200 },
  { height: 252, transformY: 0 },
  { height: 186, transformY: -240 },
  { height: 172, transformY: -430 },
  { height: 168, transformY: -600 },
]

export default function App() {
  const [active, setActive] = React.useState(-1)

  const { height, transformY } = transformValues[active + 1]

  return (
    <main className="relative flex h-screen w-full items-center justify-center p-12">
      <div className="relative flex w-full max-w-xl flex-col items-center gap-3 p-3">
        <button
          style={{
            transition: 'transform 0.3s',
            transform: active === -1 ? 'translateY(0)' : 'translateY(-200px)',
            opacity: active === -1 ? 0 : 1,
          }}
          className="rounded-full bg-slate-100 p-2 text-slate-800"
          onClick={() => setActive(-1)}
        >
          <X size={24} />
        </button>
        <div
          className="relative flex w-full items-center rounded-full bg-slate-100 p-1.5"
          style={{
            transition: 'transform 0.3s',
            transform:
              active === -1 ? 'translateY(-26px)' : 'translateY(-150px)',
          }}
        >
          {['Portfolio', 'Launches', 'Products', 'Company'].map(
            (label, index) => (
              <button
                key={index}
                className="z-20 w-full rounded-full p-1.5 font-semibold text-slate-800"
                onClick={() => setActive(index)}
              >
                {label}
              </button>
            ),
          )}
          <div
            className="absolute inset-0 z-10 flex w-1/4 items-center justify-center p-1.5"
            style={{
              transform: `translateX(${active * 100}%)`,
              transition: 'transform 0.3s',
              opacity: active === -1 ? 0 : 1,
            }}
          >
            <div className="h-full w-full rounded-full bg-white shadow-sm"></div>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-96 flex h-10 w-[620px] -translate-x-1/2 flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white p-3"
          style={{
            transform:
              active === -1 ? 'translate(-50%, 0)' : 'translate(-50%, -390px)',
            opacity: active === -1 ? 0 : 1,
            transition:
              'transform 0.3s, opacity 0.3s, background 0.3s, height 0.3s',
            background: active === 3 ? 'white' : '#f1f5f9',
            height: `${height}px`,
          }}
        >
          <div
            className="w-full rounded-lg text-black"
            style={{
              transform: `translateY(${transformY}px)`,
              transition: 'transform 0.3s',
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="h-28 w-1/2 rounded-xl bg-slate-200 p-4">
                <div className="mb-2 text-sm text-slate-500">My Sales</div>
                <div className="text-sm text-slate-500">Investment Gain</div>
                <div className="text-3xl font-bold">$2,580.12</div>
              </div>
              <div className="flex h-28 w-1/2 flex-col justify-between rounded-xl bg-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">Profile</div>
                  <span>98e3...c463</span>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Skull className="w-10 shrink-0 text-green-500" />
                  <button className="flex items-center justify-between gap-3 rounded-full bg-green-500 py-2 pl-2 pr-4 text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <ArrowRight className="text-green-500" />
                    </div>
                    <span className="">Dashboard</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4 rounded-xl bg-slate-200 p-4">
              <div>
                <div className="text-sm text-slate-500">
                  Use the Ape App &amp; earn up to 100% yield on your crypto.
                </div>
                <button className="mt-2 rounded-full bg-green-500 px-4 py-2 text-white">
                  Try the App
                </button>
              </div>
            </div>
          </div>

          <div
            className="w-full rounded-lg text-black"
            style={{
              transform: `translateY(${transformY}px)`,
              transition: 'transform 0.3s',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-green-500">mix mobs</div>
                <div className="text-lg font-bold">
                  The Everything App For BRC and Bitcoin.
                </div>
                <button className="mt-4 rounded-full bg-green-500 px-4 py-2 text-white">
                  Participate
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-100 p-4">
              <div className="flex items-center space-x-2">
                <Grid className="text-slate-500" />
                <span>All Launches</span>
              </div>
              <button className="text-sm text-slate-500">See All</button>
            </div>
          </div>

          <div
            className="flex w-full space-x-4 rounded-lg text-black"
            style={{
              transform: `translateY(${transformY}px)`,
              transition: 'transform 0.3s',
            }}
          >
            <div className="flex flex-1 flex-col justify-between rounded-lg bg-slate-100 p-4">
              <div>
                <Apple className="mb-2 h-8 w-8" />
                <div className="text-lg font-bold">Ape & Co.</div>
                <div className="text-sm text-slate-500">
                  The only Web 3 consultants that deliver results.
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-lg bg-slate-100 p-4">
              <div>
                <Apple className="mb-2 h-8 w-8" />
                <div className="text-lg font-bold">Ape Arcade</div>
                <div className="text-sm text-slate-500">
                  Ape into Fun Browser Games and Win Prizes.
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex w-full items-center justify-end rounded-lg text-black"
            style={{
              transform: `translateY(${transformY}px)`,
              transition: 'transform 0.3s',
            }}
          >
            <div className="space-y-4 rounded-lg bg-slate-100 p-4">
              <div className="flex items-center space-x-3">
                <Info className="text-slate-500" />
                <span>About</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="text-slate-500" />
                <span>FAQ</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckSquare className="text-slate-500" />
                <span>Transparency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

