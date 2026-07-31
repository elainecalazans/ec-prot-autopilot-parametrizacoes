import {
  T,
  Button,
  Combobox,
  Input,
  SelectField,
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui";
import { TIPO_SOCIO_OPCOES } from "../config/empresasConfig";

export default function QuadroSocietarioDrawer(props) {
  const {
    empresaCadastroSel,
    handleSalvarParticipacao,
    qsEditandoSocioId,
    qsForm,
    qsSheetOpen,
    setQsForm,
    setQsSheetOpen,
    socios,
  } = props;

  return (      <Sheet open={qsSheetOpen} onOpenChange={setQsSheetOpen}>
        <SheetHeader>
          <SheetTitle>{qsEditandoSocioId ? "Editar participação" : "Adicionar sócio"}</SheetTitle>
          <SheetDescription>Vincula um sócio já cadastrado no registro unificado a esta empresa, com % de participação.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Sócio</label>
            <Combobox
              value={qsForm.socioId}
              onChange={(v) => setQsForm((f) => ({ ...f, socioId: v }))}
              options={(empresaCadastroSel ? socios.filter((s) => !s.participacoes.some((p) => p.empresaCodigo === empresaCadastroSel) || String(s.id) === String(qsForm.socioId)) : socios).map((s) => ({ value: String(s.id), label: `${s.nome} — ${s.cpf}` }))}
              placeholder="Selecione um sócio"
              searchPlaceholder="Buscar por nome ou CPF..."
              emptyText="Nenhum sócio disponível — cadastre em Sócios."
              width="100%"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Participação (%)</label>
            <Input type="number" placeholder="Ex.: 50" value={qsForm.percentual} onChange={(e) => setQsForm((f) => ({ ...f, percentual: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Quotas integralizadas</label>
            <Input type="number" placeholder="Ex.: 50" value={qsForm.quotasIntegralizadas} onChange={(e) => setQsForm((f) => ({ ...f, quotasIntegralizadas: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Tipo de sócio</label>
            <SelectField value={qsForm.tipoSocio} onChange={(e) => setQsForm((f) => ({ ...f, tipoSocio: e.target.value }))}>
              <option value="">Selecione...</option>
              {TIPO_SOCIO_OPCOES.map((o) => <option key={o} value={o}>{o}</option>)}
            </SelectField>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Data de entrada</label>
            <Input placeholder="dd/mm/aaaa" value={qsForm.dataEntrada} onChange={(e) => setQsForm((f) => ({ ...f, dataEntrada: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Data de saída</label>
            <Input placeholder="dd/mm/aaaa (deixe em branco se ainda ativo)" value={qsForm.dataSaida} onChange={(e) => setQsForm((f) => ({ ...f, dataSaida: e.target.value }))} />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => setQsSheetOpen(false)}>Cancelar</Button>
          <Button disabled={!qsForm.socioId || !qsForm.percentual} onClick={handleSalvarParticipacao}>Salvar</Button>
        </SheetFooter>
      </Sheet>  );
}