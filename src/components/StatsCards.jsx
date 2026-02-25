export default function StatsCards({ stats }) {
  return (
    <div className="row mb-4">
      {["total", "applied", "interview", "offer", "rejected"].map((key) => (
        <div className="col-md-2" key={key}>
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase">{key}</h6>
              <h4>{stats[key]}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}