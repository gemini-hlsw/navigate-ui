import { createContext, useState, ReactNode, useEffect, useSyncExternalStore } from 'react';
import {
  ThemeType,
  TargetType,
  VariablesContextType,
  ConfigurationType,
  TargetEditType,
  SlewFlagsType,
  InstrumentType,
  RotatorType,
} from '@/types';
import { useGetAllInformation } from '@gql/configs/AllConfiguration';

export const VariablesContext = createContext<VariablesContextType>(null!);

export default function VariablesProvider({ children }: { children: ReactNode }) {
  // ---------- Apollo - Graphql Calls ----------
  // Queries
  const getAllInfo = useGetAllInformation();

  // Mutations
  // const updateConfiguration = useUpdateConfiguration()

  // ------------------ Theme ------------------
  const [theme, setTheme] = useState<ThemeType>('dark');
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  // Re-render on theme change
  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme]);

  // ------------------ Modals -----------------
  const [odbVisible, setOdbVisible] = useState(false);
  const [slewVisible, setSlewVisible] = useState(false);
  const [importInstrument, setImportInstrument] = useState(false);
  const [targetEdit, setTargetEdit] = useState<TargetEditType>({
    isVisible: false,
    target: {} as TargetType,
    targetIndex: undefined,
  });

  // --------- ODB Token (will be removed) ------------------
  const subscribe = (listener: () => void) => {
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  };
  // Get ODB Token from localstorage
  const getLsOdbToken = () => {
    return localStorage.getItem('odbToken');
  };

  const odbToken = useSyncExternalStore(subscribe, getLsOdbToken) ?? '';

  // ----------- Guide Targets -----------------
  const [loadingGuideTarget, setLoadingGuideTarget] = useState(false);

  // --------- Local db Config ------------------
  const [configuration, setConfiguration] = useState<ConfigurationType>({} as ConfigurationType);
  const [slewFlags, setSlewFlags] = useState<SlewFlagsType>({} as SlewFlagsType);
  const [baseTargets, setBaseTargets] = useState<TargetType[]>([]);
  const [oiTargets, setOiTargets] = useState<TargetType[]>([]);
  const [p1Targets, setP1Targets] = useState<TargetType[]>([]);
  const [p2Targets, setP2Targets] = useState<TargetType[]>([]);
  const [rotator, setRotator] = useState<RotatorType>({} as RotatorType);
  const [instrument, setInstrument] = useState<InstrumentType>({} as InstrumentType);

  useEffect(() => {
    // Initialize states
    getAllInfo({
      onCompleted({ configuration, rotator, slewFlags, targets }) {
        setConfiguration(configuration!);
        setRotator(rotator!);
        setSlewFlags(slewFlags!);
        setBaseTargets(
          targets.filter((t) => t?.type === 'SCIENCE' || t?.type === 'BLINDOFFSET' || t?.type === 'FIXED'),
        );
        setOiTargets(targets.filter((t) => t?.type === 'OIWFS'));
        setP1Targets(targets.filter((t) => t?.type === 'PWFS1'));
        setP2Targets(targets.filter((t) => t?.type === 'PWFS2'));
      },
    });
  }, []);

  const value = {
    theme,
    toggleTheme,
    odbVisible,
    setOdbVisible,
    slewVisible,
    setSlewVisible,
    targetEdit,
    setTargetEdit,
    importInstrument,
    setImportInstrument,
    configuration,
    setConfiguration,
    loadingGuideTarget,
    setLoadingGuideTarget,
    slewFlags,
    setSlewFlags,
    baseTargets,
    setBaseTargets,
    oiTargets,
    setOiTargets,
    p1Targets,
    setP1Targets,
    p2Targets,
    setP2Targets,
    instrument,
    setInstrument,
    rotator,
    setRotator,
    odbToken,
  };

  return <VariablesContext.Provider value={value}>{children}</VariablesContext.Provider>;
}
