import { useEffect, useState } from 'react';
import { getPeople, createPerson, updatePerson } from '../services/personApi';
import type { Person } from '../models/models';
import './people-list.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPerson, setEditPerson] = useState<Partial<Person> & { name: string; currentRank: string; currentDuty: string }>(
    { name: '', currentRank: '', currentDuty: '' }
  );

  const load = async () => {
    setStatus('Loading...');
    try {
      const data = await getPeople();
      setPeople(data.people);
      setStatus('');
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async () => {
    if (!newName.trim()) return;
    setStatus('Creating...');
    try {
      await createPerson(newName.trim());
      setNewName('');
      await load();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  const startEdit = (p: Person) => {
    setEditingId(p.id);
    setEditPerson({
      ...p,
      name: p.name,
      currentRank: p.astronautDetail?.currentRank ?? '',
      currentDuty: p.astronautDetail?.currentDutyTitle ?? '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPerson({ name: '', currentRank: '', currentDuty: '' });
  };

  const saveEdit = async (p: Person) => {
    const updated: Person = {
      ...p,
      name: editPerson.name,
      astronautDetail: {
        id: p.astronautDetail?.id ?? 0,
        personId: p.id,
        currentRank: editPerson.currentRank,
        currentDutyTitle: editPerson.currentDuty,
        careerStartDate: p.astronautDetail?.careerStartDate ?? new Date().toISOString(),
        careerEndDate: p.astronautDetail?.careerEndDate ?? null,
      },
    };
    setStatus('Updating...');
    try {
      await updatePerson(updated);
      await load();
      setEditingId(null);
      setEditPerson({ name: '', currentRank: '', currentDuty: '' });
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 20 }}>Personnel</h2>
      {status && <div style={{ marginBottom: 12 }}>{status}</div>}
      <div className="input-group mb-3" style={{ maxWidth: 500 }}>
        <span className="input-group-text fs-6 fw-bold" id="basic-addon1" style={{ minWidth: 150 }}>Add New Person:</span>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          aria-label="Name"
          aria-describedby="basic-addon1"
        />
        <button
          className="btn btn-outline-success btn-sm"
          onClick={onCreate}
          type="button"
        >
          Create
        </button>
      </div>

      <div className="row">
        {people.map(p => (
          <div className="col-md-6 col-lg-4 mb-4" key={p.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                {editingId === p.id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editPerson.name}
                      onChange={e => setEditPerson({ ...editPerson, name: e.target.value })}
                      placeholder="Name"
                    />
                    <input
                      className="form-control mb-2"
                      value={editPerson.currentRank}
                      onChange={e => setEditPerson({ ...editPerson, currentRank: e.target.value })}
                      placeholder="Current Rank"
                    />
                    <input
                      className="form-control mb-3"
                      value={editPerson.currentDuty}
                      onChange={e => setEditPerson({ ...editPerson, currentDuty: e.target.value })}
                      placeholder="Current Duty Title"
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(p)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title mb-2">{p.name}</h5>
                    <p className="mb-1">
                      <span className="fw-bold">Current Rank:</span> {p.astronautDetail?.currentRank ?? '-'}
                    </p>
                    <p className="mb-3">
                      <span className="fw-bold">Current Duty Title:</span> {p.astronautDetail?.currentDutyTitle ?? '-'}
                    </p>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => startEdit(p)}
                    >
                      Update
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {people.length === 0 && !status && <div>No people found.</div>}
    </div>
  );
}