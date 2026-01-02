import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import api from '../../services/api';
import MemberCard from './MemberCard';
import InviteModal from './InviteModal';

const TeamSection = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const { data } = await api.get('/team');
            setTeam(data.members);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch team", error);
            setLoading(false);
        }
    };

    const handleInvite = async (email, role) => {
        try {
            await api.post('/team/invite', { email, role });
            // Optimistically add or refresh
            fetchTeam();
        } catch (error) {
            alert('Failed to invite: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleResend = (email) => {
        console.log("Resending invite to", email);
        // Implement logic if needed
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Team Members</h2>
                    <p className="text-sm text-txt-muted">Manage access and roles.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-zen btn-zen-primary"
                >
                    <UserPlus size={16} />
                    <span>Invite Member</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.map((member) => (
                    <MemberCard
                        key={member._id}
                        member={member}
                        onResend={handleResend}
                    />
                ))}
            </div>

            <InviteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onInvite={handleInvite}
            />
        </div>
    );
};

export default TeamSection;
