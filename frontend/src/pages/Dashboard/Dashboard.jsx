import { useEffect, useState } from "react";
import HeroBanner from "../../components/dashboard/HeroBanner";
import StatsCards from "../../components/dashboard/StatsCards";
import RecentTrips from "../../components/dashboard/RecentTrips";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import QuoteCard from "../../components/dashboard/QuoteCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { getProfile } from "../../services/authProfileService";
import { getTrips } from "../../services/tripService";
import { getPreferences } from "../../services/preferenceService";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [profileData, tripsData, prefData] = await Promise.all([
          getProfile().catch(() => null),
          getTrips().catch(() => []),
          getPreferences().catch(() => null)
        ]);

        setUser(profileData);
        setTrips(tripsData);
        setPreferences(prefData);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading Dashboard..." />;
  }

  const isNewUser = trips.length === 0;

  return (
    <div className="space-y-6">
      <HeroBanner user={user} isNewUser={isNewUser} />
      
      <StatsCards trips={trips} />
      
      <RecentTrips trips={trips} isNewUser={isNewUser} />
      
      <RecommendationCard preferences={preferences} />
      
      <QuoteCard />
    </div>
  );
}