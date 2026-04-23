// Career Explorer Logic - Satellite Orbit Metaphor
document.addEventListener('DOMContentLoaded', () => {
    const careerNodesContainer = document.getElementById('career-nodes');

    const quizResult = JSON.parse(localStorage.getItem('kareer_result') || '{}');
    const userScores = quizResult.scores || {};

    const groupToRiasec = {
        realistic: 'R', investigative: 'I', artistic: 'A', social: 'S', enterprising: 'E', conventional: 'C'
    };

    const userRiasec = {};
    Object.keys(groupToRiasec).forEach(group => {
        userRiasec[groupToRiasec[group]] = userScores[group] || 0;
    });

    const careerDatabase = [
        { name: "Giám đốc Công nghệ (CTO) / Kiến trúc sư trưởng", code: "2512", riasec: ["I", "R"], salary: "18-55 triệu VNĐ", market: "ITviec: Nhu cầu ổn định, ưu tiên Full-stack và Cloud." },
        { name: "Trưởng phòng Phân tích dữ liệu chiến lược", code: "2511", riasec: ["I", "C"], salary: "15-45 triệu VNĐ", market: "Robert Walters: Tăng trưởng mạnh trong Tài chính và E-commerce." },
        { name: "Giám đốc Trải nghiệm (CXO) / Giám đốc Nghệ thuật", code: "2166", riasec: ["A", "I"], salary: "15-40 triệu VNĐ", market: "Reeracoen: Cần kỹ năng nghiên cứu người dùng sâu." },
        { name: "Giám đốc Quản lý Dự án & Vận hành IT", code: "2511", riasec: ["E", "C"], salary: "35-80 triệu VNĐ", market: "Robert Walters: Ưu tiên ứng viên có chứng chỉ PMP/Agile." },
        { name: "Giám đốc Marketing số", code: "2431", riasec: ["E", "A"], salary: "12-35 triệu VNĐ", market: "LinkedIn: Xu hướng chuyển dịch sang Data-driven Marketing." },
        { name: "Giám đốc Tài chính (CFO)", code: "2411", riasec: ["C", "E"], salary: "25-65 triệu VNĐ", market: "Adecco: Yêu cầu cao về tuân thủ và chứng chỉ quốc tế." },
        { name: "Giám đốc Nhân sự (CHRO)", code: "2423", riasec: ["S", "E"], salary: "12-30 triệu VNĐ", market: "Manpower: Tập trung vào giữ chân nhân tài và văn hóa." },
        { name: "Kiến trúc sư trưởng / Chủ trì thiết kế cấp cao", code: "2161", riasec: ["A", "R"], salary: "15-45 triệu VNĐ", market: "QĐ 34: Nhóm chuyên gia kỹ thuật bậc cao." },
        { name: "Giám đốc Y khoa / Chuyên gia Tư vấn Cấp cao", code: "2211", riasec: ["I", "S"], salary: "25-100 triệu VNĐ", market: "Thị trường: Y tế tư nhân đang mở rộng mạnh mẽ." },
        { name: "Đối tác Quản lý Tài sản Cấp cao (Wealth Manager)", code: "2412", riasec: ["E", "I"], salary: "20-120 triệu+ VNĐ", market: "Robert Walters: Thu nhập đột phá theo doanh số." },
        { name: "Chuyên gia Tư vấn Chiến lược Sức khỏe Tinh thần", code: "2634", riasec: ["S", "I"], salary: "15-35 triệu VNĐ", market: "Xu hướng: Dịch vụ tham vấn học đường và doanh nghiệp." },
        { name: "Trưởng phòng Kỹ thuật / Chuyên gia Tư vấn Công nghiệp", code: "2144", riasec: ["R", "I"], salary: "15-40 triệu VNĐ", market: "Reeracoen: Nhu cầu cao tại các KCN miền Bắc và Nam." },
        { name: "Giám đốc Kiểm toán / Đối tác (Partner)", code: "2411", riasec: ["C", "I"], salary: "12-50 triệu VNĐ", market: "Big4: Lộ trình thăng tiến rõ ràng, áp lực cao." },
        { name: "Giám đốc Truyền thông & Thương hiệu", code: "2432", riasec: ["E", "S"], salary: "15-40 triệu VNĐ", market: "VietnamWorks: Cần mạng lưới báo chí và KOLs rộng." },
        { name: "Chuyên gia Nghiên cứu AI / Giám đốc Khoa học", code: "2512", riasec: ["I", "R"], salary: "45-130 triệu VNĐ", market: "ITviec: Cạnh tranh toàn cầu, cực kỳ khan hiếm." },
        { name: "Giám đốc Chuỗi cung ứng (CSO)", code: "1324", riasec: ["C", "E"], salary: "35-90 triệu VNĐ", market: "Robert Walters: Vai trò chiến lược trong chuyển dịch FDI." },
        { name: "Giám đốc Sáng tạo / Chủ sở hữu thương hiệu thời trang", code: "2163", riasec: ["A", "R"], salary: "12-45 triệu VNĐ", market: "QĐ 34: Nhóm thiết kế sản phẩm và may mặc." },
        { name: "Chuyên gia Ngôn ngữ / Giám đốc Học thuật", code: "2353", riasec: ["S", "A"], salary: "15-45 triệu VNĐ", market: "Thị trường: Ưu tiên chứng chỉ IELTS/TESOL quốc tế." },
        { name: "Giám đốc Pháp chế / Luật sư điều hành", code: "2611", riasec: ["I", "C"], salary: "15-55 triệu VNĐ", market: "Navigos: Nhu cầu cao trong M&A và tuân thủ doanh nghiệp." },
        { name: "Chủ tịch Hội đồng Quản trị / Tổng Giám đốc (CEO)", code: "1120", riasec: ["E", "A"], salary: "Vô hạn", market: "Startup: Hệ sinh thái khởi nghiệp Việt Nam năng động." },
        { name: "Giám đốc Điều hành Khách sạn / Khu nghỉ dưỡng", code: "1411", riasec: ["E", "S"], salary: "25-70 triệu VNĐ", market: "Reeracoen: Phục hồi mạnh tại các thủ phủ du lịch." },
        { name: "Trưởng khoa học dữ liệu (Chief Data Scientist)", code: "2120", riasec: ["I", "R"], salary: "35-100 triệu VNĐ", market: "Robert Walters: Kỹ năng cốt lõi của kỷ nguyên số." }
    ];

    const reasons = {
        "Very High": "Dựa trên RIASEC, đây là vị trí cao nhất và phù hợp tuyệt đối với tiềm năng của bạn.",
        "High": "Vị trí này phản ánh sự giao thoa hoàn hảo giữa đam mê và năng lực đỉnh cao của bạn.",
        "Medium": "Bạn có tiềm năng đạt tới vị trí này, nhưng cần bồi dưỡng thêm một số kỹ năng chuyên biệt.",
        "Low": "Vị trí này có thể là một thử thách mới, giúp bạn mở rộng giới hạn bản thân.",
        "Very Low": "Đòi hỏi sự nỗ lực vượt bậc để chinh phục vị trí đặc thù này."
    };

    function getRawScore(career) {
        const sortedUserTraits = Object.entries(userRiasec).sort(([, a], [, b]) => b - a);
        const topUserTrait = sortedUserTraits[0][0];
        const secondUserTrait = sortedUserTraits[1][0];
        const maxScore = sortedUserTraits[0][1];

        let score = 0;
        career.riasec.forEach((code, index) => {
            const weight = index === 0 ? 1.0 : 0.6;
            score += (userRiasec[code] || 0) * weight;
        });

        const possibleMax = maxScore * 1.6;
        let normalized = possibleMax > 0 ? (score / possibleMax) * 100 : 0;

        if (career.riasec[0] === topUserTrait) normalized += 15;
        if (career.riasec[0] === secondUserTrait) normalized += 5;

        return normalized;
    }

    function placeNodes() {
        if (!careerNodesContainer) return;
        careerNodesContainer.innerHTML = '';

        const processedCareers = careerDatabase
            .map(c => ({ ...c, rawScore: getRawScore(c) }))
            .sort((a, b) => b.rawScore - a.rawScore);

        processedCareers.forEach((c, index) => {
            const rankPct = (index / processedCareers.length) * 100;
            if (rankPct < 20) c.fit = "Very High";
            else if (rankPct < 40) c.fit = "High";
            else if (rankPct < 60) c.fit = "Medium";
            else if (rankPct < 80) c.fit = "Low";
            else c.fit = "Very Low";
        });

        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width <= 768;

        const fitLevels = [
            { level: "Very High", label: "Rất cao", r: 14, color: "#D3F9D8" }, 
            { level: "High", label: "Cao", r: 24, color: "#D0EBFF" },      
            { level: "Medium", label: "Trung bình", r: 34, color: "#FFDEEB" }, 
            { level: "Low", label: "Thấp", r: 44, color: "#FFF3BF" },      
            { level: "Very Low", label: "Rất thấp", r: 52, color: "#FFE8CC" } 
        ];

        if (isMobile) { 
            fitLevels.forEach(f => { f.r *= 0.7; }); 
        }

        const tabDetail = document.getElementById('tab-detail');
        const tabRoadmap = document.getElementById('tab-roadmap');

        const updateTabs = (careerName) => {
            if (tabDetail) tabDetail.setAttribute('href', `timeline.html?career=${encodeURIComponent(careerName)}`);
            if (tabRoadmap) tabRoadmap.setAttribute('href', `roadmap.html?career=${encodeURIComponent(careerName)}`);
        };

        const selectCareer = (careerName, dotElement = null, fitLevel = null) => {
            localStorage.setItem('selectedCareer', careerName);
            updateTabs(careerName);

            if (typeof KareerAPI !== 'undefined') {
                KareerAPI.saveCareerSelection(careerName, fitLevel).catch(() => { });
            }

            document.querySelectorAll('.node-dot').forEach(d => d.classList.remove('selected'));
            if (dotElement) dotElement.classList.add('selected');
        };

        // 1. Initialize nodes with target positions
        const nodes = [];
        fitLevels.forEach((fitData, tierIndex) => {
            const items = processedCareers.filter(c => c.fit === fitData.level);
            if (items.length === 0) return;

            const itemCount = items.length;
            const tierRotation = (tierIndex * 45) * (Math.PI / 180);

            items.forEach((career, index) => {
                const angle = tierRotation + (index / itemCount) * Math.PI * 2;
                const r = fitData.r;
                
                // Target coordinates in percentages (0-100)
                let targetX = 50 + (r * 1.3 * Math.cos(angle)); 
                let targetY = 50 + (r * 1.0 * Math.sin(angle)); 

                nodes.push({
                    career, fitData,
                    targetX, targetY,
                    x: targetX, y: targetY,
                    vx: 0, vy: 0
                });
            });
        });

        // 2. Physics Simulation to separate overlapping nodes
        const ITERATIONS = 150;
        const MIN_DX = 7; // Min horizontal clearance %
        const MIN_DY = 9; // Min vertical clearance % (larger because labels hang down)

        for (let i = 0; i < ITERATIONS; i++) {
            // Apply repulsion between nodes
            for (let j = 0; j < nodes.length; j++) {
                for (let k = j + 1; k < nodes.length; k++) {
                    const n1 = nodes[j];
                    const n2 = nodes[k];
                    
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    
                    if (Math.abs(dx) < MIN_DX && Math.abs(dy) < MIN_DY) {
                        // Nodes overlap! Calculate push force
                        const pushX = (MIN_DX - Math.abs(dx)) * Math.sign(dx || 1) * 0.1;
                        const pushY = (MIN_DY - Math.abs(dy)) * Math.sign(dy || 1) * 0.1;
                        
                        n1.vx -= pushX;
                        n1.vy -= pushY;
                        n2.vx += pushX;
                        n2.vy += pushY;
                    }
                }
            }

            // Apply attraction and update positions
            nodes.forEach(n => {
                // Gently pull back to intended orbit target
                n.vx += (n.targetX - n.x) * 0.02;
                n.vy += (n.targetY - n.y) * 0.02;

                n.x += n.vx;
                n.y += n.vy;

                // Dampen velocity to stabilize
                n.vx *= 0.8;
                n.vy *= 0.8;

                // Keep strictly away from the Central Hub (approx 12% radius)
                const distToCenter = Math.sqrt((n.x-50)**2 + (n.y-50)**2);
                if (distToCenter < 14) {
                    const push = (14 - distToCenter) / distToCenter;
                    n.x += (n.x - 50) * push * 0.5;
                    n.y += (n.y - 50) * push * 0.5;
                }

                // Keep strictly within screen bounds
                // Increased the top boundary (y) from 8 to 18 to prevent hiding under navigation tabs
                n.x = Math.max(5, Math.min(95, n.x));
                n.y = Math.max(18, Math.min(92, n.y));
            });
        }

        // 3. Render final settled nodes
        nodes.forEach(n => {
            const wrapper = document.createElement('div');
            wrapper.className = 'node-wrapper';
            wrapper.style.left = `${n.x}%`;
            wrapper.style.top = `${n.y}%`;

            const fitClass = n.fitData.level.toLowerCase().replace(' ', '-');
            const isFlipped = n.y < 40; 

            wrapper.innerHTML = `
                <div class="node-animator" style="animation: float ${10 + Math.random() * 8}s ease-in-out infinite;">
                    <div class="career-node">
                        <div class="node-dot ${fitClass}" style="background-color: ${n.fitData.color}; border: 1.5px solid #000;"></div>
                        <div class="node-label">${n.career.name}</div>
                        <div class="node-tooltip ${isFlipped ? 'flipped' : ''}">
                            <div class="tooltip-header">
                                <span class="tooltip-fit ${fitClass}">Phù hợp: ${n.fitData.label}</span>
                                <span class="tooltip-code">Mã QĐ34: ${n.career.code}</span>
                            </div>
                            <p class="tooltip-desc"><strong>Thị trường:</strong> ${n.career.market}</p>
                            <p class="tooltip-salary"><strong>Lương TB:</strong> ${n.career.salary}</p>
                            <p class="tooltip-reason"><em>${reasons[n.fitData.level]}</em></p>
                            <button class="tooltip-btn" data-career="${n.career.name}">Xem chi tiết</button>
                        </div>
                    </div>
                </div>
            `;
            careerNodesContainer.appendChild(wrapper);

            const nodeBtn = wrapper.querySelector('.tooltip-btn');
            nodeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const careerName = nodeBtn.getAttribute('data-career');
                selectCareer(careerName, wrapper.querySelector('.node-dot'), n.fitData.label);
                location.href = `timeline.html?career=${encodeURIComponent(careerName)}`;
            });

            wrapper.querySelector('.node-dot').addEventListener('click', () => {
                selectCareer(n.career.name, wrapper.querySelector('.node-dot'), n.fitData.label);
            });
        });

        const lastCareer = localStorage.getItem('selectedCareer');
        if (lastCareer) updateTabs(lastCareer);
    }

    placeNodes();
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(placeNodes, 300);
    });

    const hub = document.querySelector('.central-hub');
    if (hub) {
        hub.addEventListener('click', () => {
            const modal = document.getElementById('strengths-modal');
            if (!modal) return;

            const profile = JSON.parse(localStorage.getItem('kareer_profile') || '{}');
            const quizResult = JSON.parse(localStorage.getItem('kareer_result') || '{}');
            const userName = profile.name || 'Bạn';

            const sortedRiasec = Object.entries(userRiasec).sort(([, a], [, b]) => b - a);
            const topType = sortedRiasec[0][0];
            const secType = sortedRiasec[1][0];

            const typeNames = {
                'R': 'Thực tế (Realistic)', 'I': 'Nghiên cứu (Investigative)',
                'A': 'Nghệ thuật (Artistic)', 'S': 'Xã hội (Social)',
                'E': 'Quản lý (Enterprising)', 'C': 'Nề nếp (Conventional)'
            };

            const identityTraits = {
                'R': "Bạn là người có tư duy thực chứng, coi trọng giá trị hữu hình và sự vận hành chuẩn xác của máy móc, công nghệ.",
                'I': "Bản sắc của bạn gắn liền với sự tò mò trí tuệ, khả năng phân tích đa chiều và nhu cầu tìm hiểu gốc rễ vấn đề.",
                'A': "Bạn sở hữu một trực giác nhạy bén, tâm hồn tự do và nhu cầu biểu đạt cá tính thông qua các giải pháp sáng tạo.",
                'S': "Giá trị cốt lõi của bạn nằm ở sự thấu cảm, khả năng kết nối và khát khao đóng góp cho sự phát triển của con người.",
                'E': "Bạn là người tràn đầy năng lượng mục tiêu, có khả năng dẫn dắt và thuyết phục người khác bằng tầm nhìn của mình.",
                'C': "Sự kỷ luật, tính hệ thống và khả năng kiểm soát dữ liệu là những nền tảng tạo nên bản sắc chuyên nghiệp của bạn."
            };

            const strategyAdvice = {
                'R': "Hãy tập trung vào việc làm chủ các công nghệ lõi và bổ sung thêm tư duy thiết kế hệ thống để tối ưu hiệu suất.",
                'I': "Bạn nên tham gia vào các dự án nghiên cứu chuyên sâu hoặc phân tích chiến lược, nơi trí tuệ được thách thức tối đa.",
                'A': "Tìm kiếm môi trường cho phép sự linh hoạt, tránh các quy trình gò bó để năng lực đổi mới không bị mai một.",
                'S': "Phát triển thêm kỹ năng quản trị xung đột và điều phối nhóm sẽ giúp bạn trở thành một nhà tư vấn/đào tạo xuất sắc.",
                'E': "Xây dựng mạng lưới quan hệ rộng và học cách quản trị rủi ro sẽ giúp các quyết định dẫn dắt của bạn trở nên bền vững hơn.",
                'C': "Tận dụng thế mạnh về tổ chức để xây dựng các quy trình chuẩn cho doanh nghiệp hoặc chuyên sâu vào quản trị tài chính."
            };

            const fullAnalysis = `
                <div class="analysis-report-container">
                    <header class="report-header">
                        <span class="report-tag">BÁO CÁO PHÂN TÍCH CHUYÊN SÂU</span>
                        <h1 class="report-main-title">Hồ Sơ Bản Sắc Nghề Nghiệp</h1>
                    </header>

                    <div class="report-section">
                        <h2 class="section-title">1. Phân tích Bản sắc cá nhân</h2>
                        <p class="section-p">
                            Dựa trên phản hồi từ bài test đa chiều, hệ thống nhận diện bạn là một cá nhân có bản sắc <strong>${typeNames[topType]}</strong> rõ rệt. ${identityTraits[topType]} 
                            Sự kết hợp thêm yếu tố <strong>${typeNames[secType]}</strong> tạo nên một biến số độc đáo: Bạn không chỉ thực hiện nhiệm vụ một cách máy móc mà luôn có sự 
                            ${secType === 'I' ? 'đào sâu suy nghĩ' : secType === 'A' ? 'biến tấu sáng tạo' : secType === 'E' ? 'định hướng mục tiêu' : 'cân nhắc kỹ lưỡng'}.
                        </p>
                    </div>

                    <div class="report-section">
                        <h2 class="section-title">2. Lập luận về sự tương thích nghề nghiệp</h2>
                        <p class="section-p">
                            Lý do bạn cảm thấy bị thu hút bởi các công việc trong ma trận là do sự tương đồng giữa <strong>Cấu trúc tư duy</strong> của bạn và <strong>Đặc thù lĩnh vực</strong>. 
                            Các vị trí nằm ở quỹ đạo gần tâm nhất phản ánh nơi mà các kỹ năng tự nhiên của bạn được phát huy với ít nỗ lực nhất nhưng mang lại hiệu quả cao nhất.
                            Mối liên kết giữa nhóm ${typeNames[topType]} và ${typeNames[secType]} cho thấy bạn sẽ tỏa sáng nhất trong các vai trò yêu cầu sự giao thoa giữa 
                            ${topType === 'R' ? 'kỹ thuật' : topType === 'I' ? 'trí tuệ' : 'kỹ năng'} và ${secType === 'S' ? 'con người' : 'quy trình'}.
                        </p>
                    </div>

                    <div class="report-section">
                        <h2 class="section-title">3. Kết luận</h2>
                        <div class="advice-grid">
                            <div class="advice-card">
                                <h3>Trọng tâm phát triển</h3>
                                <p>${strategyAdvice[topType]}</p>
                            </div>
                            <div class="advice-card">
                                <h3>Điểm cần lưu ý</h3>
                                <p>Đôi khi sự quá tập trung vào ${topType === 'C' ? 'chi tiết' : topType === 'E' ? 'thành tích' : 'ý tưởng'} có thể khiến bạn bỏ lỡ cái nhìn tổng quan. Hãy học cách cân bằng lại bằng cách phối hợp với những người thuộc nhóm đối lập trên ma trận.</p>
                            </div>
                        </div>
                    </div>

                    <footer class="report-footer">
                        <p>Báo cáo được trích xuất dựa trên mô hình tâm lý học nghề nghiệp RIASEC & hệ thống dữ liệu thị trường Kareer.</p>
                    </footer>
                </div>
            `;

            const rect = hub.getBoundingClientRect();
            modal.style.top = `${rect.top}px`;
            modal.style.left = `${rect.left}px`;
            modal.style.width = `${rect.width}px`;
            modal.style.height = `${rect.height}px`;
            modal.style.borderRadius = '50%';
            modal.style.opacity = '1';
            modal.offsetHeight;

            document.getElementById('analysis-paragraph').innerHTML = fullAnalysis;
            modal.classList.add('active');
        });
    }

    const closeBtn = document.querySelector('.close-modal-btn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            const modal = document.getElementById('strengths-modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.top = '';
                modal.style.left = '';
                modal.style.width = '';
                modal.style.height = '';
                modal.style.borderRadius = '';
                modal.style.opacity = '';
            }, 550);
        };
    }
});
