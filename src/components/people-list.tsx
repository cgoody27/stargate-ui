import { useEffect, useState } from 'react';
import { getPeople, createPerson, updatePerson } from '../services/personApi';
import type { Person } from '../models/models';

export default function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [status, setStatus] = useState('');

  const load = async () => {
    setStatus('Loading...');
    try {
      const data = await getPeople();
      setPeople(data);
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

  // Minimal demo update: toggles a dummy rank/title on first duty/detail
  const onQuickUpdate = async (p: Person) => {
    const updated: Person = {
      ...p,
      astronautDetail: {
        id: p.astronautDetail?.id ?? 0,
        personId: p.id,
        currentRank: p.astronautDetail?.currentRank ? 'Captain' : 'Major',
        currentDutyTitle: p.astronautDetail?.currentDutyTitle ? 'Commander' : 'Pilot',
        careerStartDate: p.astronautDetail?.careerStartDate ?? new Date().toISOString(),
        careerEndDate: p.astronautDetail?.careerEndDate ?? null
      },
      astronautDuties: p.astronautDuties?.length ? p.astronautDuties : [{
        id: 0,
        personId: p.id,
        rank: 'Major',
        dutyTitle: 'Pilot',
        dutyStartDate: new Date().toISOString(),
        dutyEndDate: null
      }]
    };

    setStatus('Updating...');
    try {
      await updatePerson(updated);
      await load();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>People</h2>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="New person name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={onCreate} style={{ marginLeft: 8 }}>Create</button>
      </div>

      {status && <div style={{ marginBottom: 12 }}>{status}</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Duty Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.astronautDetail?.currentRank ?? '-'}</td>
              <td>{p.astronautDetail?.currentDutyTitle ?? '-'}</td>
              <td>
                <button onClick={() => onQuickUpdate(p)}>Quick Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}