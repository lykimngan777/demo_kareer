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
        { name: "Kỹ sư phần mềm", code: "2512", riasec: ["I", "R"], salary: "18-55 triệu VNĐ", market: "ITviec: Nhu cầu ổn định, ưu tiên Full-stack và Cloud." },
        { name: "Chuyên viên Phân tích dữ liệu", code: "2511", riasec: ["I", "C"], salary: "15-45 triệu VNĐ", market: "Robert Walters: Tăng trưởng mạnh trong Tài chính và E-commerce." },
        { name: "Nhà thiết kế UX/UI", code: "2166", riasec: ["A", "I"], salary: "15-40 triệu VNĐ", market: "Reeracoen: Cần kỹ năng nghiên cứu người dùng sâu." },
        { name: "Quản lý Dự án IT", code: "2511", riasec: ["E", "C"], salary: "35-80 triệu VNĐ", market: "Robert Walters: Ưu tiên ứng viên có chứng chỉ PMP/Agile." },
        { name: "Chuyên viên Marketing số", code: "2431", riasec: ["E", "A"], salary: "12-35 triệu VNĐ", market: "LinkedIn: Xu hướng chuyển dịch sang Data-driven Marketing." },
        { name: "Kế toán trưởng", code: "2411", riasec: ["C", "E"], salary: "25-65 triệu VNĐ", market: "Adecco: Yêu cầu cao về tuân thủ và chứng chỉ quốc tế." },
        { name: "Chuyên viên Nhân sự", code: "2423", riasec: ["S", "E"], salary: "12-30 triệu VNĐ", market: "Manpower: Tập trung vào giữ chân nhân tài và văn hóa." },
        { name: "Kiến trúc sư", code: "2161", riasec: ["A", "R"], salary: "15-45 triệu VNĐ", market: "QĐ 34: Nhóm chuyên gia kỹ thuật bậc cao." },
        { name: "Bác sĩ Đa khoa", code: "2211", riasec: ["I", "S"], salary: "25-100 triệu VNĐ", market: "Thị trường: Y tế tư nhân đang mở rộng mạnh mẽ." },
        { name: "Chuyên viên Tư vấn Tài chính", code: "2412", riasec: ["E", "I"], salary: "20-120 triệu+ VNĐ", market: "Robert Walters: Thu nhập đột phá theo doanh số." },
        { name: "Nhà tâm lý học", code: "2634", riasec: ["S", "I"], salary: "15-35 triệu VNĐ", market: "Xu hướng: Dịch vụ tham vấn học đường và doanh nghiệp." },
        { name: "Kỹ sư Cơ khí", code: "2144", riasec: ["R", "I"], salary: "15-40 triệu VNĐ", market: "Reeracoen: Nhu cầu cao tại các KCN miền Bắc và Nam." },
        { name: "Kiểm toán viên", code: "2411", riasec: ["C", "I"], salary: "12-50 triệu VNĐ", market: "Big4: Lộ trình thăng tiến rõ ràng, áp lực cao." },
        { name: "Chuyên viên PR & Truyền thông", code: "2432", riasec: ["E", "S"], salary: "15-40 triệu VNĐ", market: "VietnamWorks: Cần mạng lưới báo chí và KOLs rộng." },
        { name: "Lập trình viên AI/ML", code: "2512", riasec: ["I", "R"], salary: "45-130 triệu VNĐ", market: "ITviec: Cạnh tranh toàn cầu, cực kỳ khan hiếm." },
        { name: "Quản lý Chuỗi cung ứng", code: "1324", riasec: ["C", "E"], salary: "35-90 triệu VNĐ", market: "Robert Walters: Vai trò chiến lược trong chuyển dịch FDI." },
        { name: "Nhà thiết kế thời trang", code: "2163", riasec: ["A", "R"], salary: "12-45 triệu VNĐ", market: "QĐ 34: Nhóm thiết kế sản phẩm và may mặc." },
        { name: "Giáo viên Tiếng Anh", code: "2353", riasec: ["S", "A"], salary: "15-45 triệu VNĐ", market: "Thị trường: Ưu tiên chứng chỉ IELTS/TESOL quốc tế." },
        { name: "Chuyên viên Luật", code: "2611", riasec: ["I", "C"], salary: "15-55 triệu VNĐ", market: "Navigos: Nhu cầu cao trong M&A và tuân thủ doanh nghiệp." },
        { name: "Doanh nhân / Founder", code: "1120", riasec: ["E", "A"], salary: "Vô hạn", market: "Startup: Hệ sinh thái khởi nghiệp Việt Nam năng động." },
        { name: "Quản lý Khách sạn", code: "1411", riasec: ["E", "S"], salary: "25-70 triệu VNĐ", market: "Reeracoen: Phục hồi mạnh tại các thủ phủ du lịch." },
        { name: "Nhà khoa học dữ liệu", code: "2120", riasec: ["I", "R"], salary: "35-100 triệu VNĐ", market: "Robert Walters: Kỹ năng cốt lõi của kỷ nguyên số." }
    ];

    const reasons = {
        "Very High": "Dựa trên RIASEC, bạn có sự tương đồng tuyệt đối với yêu cầu cốt lõi của nghề này.",
        "High": "Sự kết hợp giữa đam mê và năng lực của bạn sẽ giúp bạn tỏa sáng nhanh chóng.",
        "Medium": "Bạn có tiềm năng, nhưng cần bồi dưỡng thêm một số kỹ năng chuyên biệt.",
        "Low": "Nghề này có thể mang lại góc nhìn mới, dù không phải thế mạnh tự nhiên của bạn.",
        "Very Low": "Đòi hỏi sự nỗ lực vượt bậc để thích nghi với môi trường làm việc đặc thù."
    };

    function calculateFit(career) {
        let score = 0;
        career.riasec.forEach((code, index) => {
            const weight = index === 0 ? 1.0 : 0.6;
            score += (userRiasec[code] || 0) * weight;
        });
        const normalized = (score / 160) * 100;
        if (normalized >= 85) return "Very High";
        if (normalized >= 70) return "High";
        if (normalized >= 50) return "Medium";
        if (normalized >= 30) return "Low";
        return "Very Low";
    }

    function placeNodes() {
        if (!careerNodesContainer) return;
        careerNodesContainer.innerHTML = '';

        const processedCareers = careerDatabase.map(c => ({ ...c, fit: calculateFit(c) }));

        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width <= 768;

        const fitLevels = [
            { level: "Very High", label: "Rất cao", r: 32 },
            { level: "High", label: "Cao", r: 50 },
            { level: "Medium", label: "Trung bình", r: 68 },
            { level: "Low", label: "Thấp", r: 86 },
            { level: "Very Low", label: "Rất thấp", r: 104 }
        ];

        if (isMobile) { fitLevels.forEach(f => { f.r *= 0.8; }); }

        const placedNodes = [];
        const tabDetail = document.getElementById('tab-detail');
        const tabRoadmap = document.getElementById('tab-roadmap');

        const updateTabs = (careerName) => {
            // Updated paths - flat structure
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
            if (dotElement) {
                dotElement.classList.add('selected');
            } else {
                const allWrappers = document.querySelectorAll('.career-node-wrapper');
                allWrappers.forEach(w => {
                    if (w.querySelector('.node-label')?.innerText.trim() === careerName.trim()) {
                        w.querySelector('.node-dot').classList.add('selected');
                    }
                });
            }
        };

        fitLevels.forEach((fitData) => {
            const items = processedCareers.filter(c => c.fit === fitData.level);
            if (items.length === 0) return;

            items.forEach((career) => {
                let bestX = 50, bestY = 50, bestDir = 'node-right';
                let maxMinDist = -1;
                const labelWidthPx = career.name.length * 10 + 40;

                for (let i = 0; i < 800; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = fitData.r;
                    const rXPct = (r * height / width);
                    const rYPct = r;

                    let xPct = 50 + (rXPct * Math.cos(angle));
                    let yPct = 50 + (rYPct * Math.sin(angle));

                    const dx = xPct - 50;
                    const dy = yPct - 50;

                    let dir = '';
                    if (isMobile) {
                        dir = dy < 0 ? 'node-top' : 'node-bottom';
                    } else {
                        if (Math.abs(dy) > Math.abs(dx) * 1.1) {
                            dir = dy < 0 ? 'node-top' : 'node-bottom';
                        } else {
                            dir = dx < 0 ? 'node-left' : 'node-right';
                        }
                    }

                    const labelWPct = (labelWidthPx / width) * 100;
                    let lMargin = 10, rMargin = 12, tMargin = 18, bMargin = 8;
                    if (dir === 'node-left') lMargin = labelWPct + 2;
                    if (dir === 'node-right') rMargin = labelWPct + 2;

                    if (xPct < lMargin) xPct = lMargin;
                    if (xPct > (100 - rMargin)) xPct = 100 - rMargin;
                    if (yPct < tMargin) yPct = tMargin;
                    if (yPct > (100 - bMargin)) yPct = 100 - bMargin;

                    const px = (xPct / 100) * width;
                    const py = (yPct / 100) * height;

                    let minDist = 999999;
                    for (let placed of placedNodes) {
                        const adx = Math.abs(placed.px - px);
                        const ady = Math.abs(placed.py - py);
                        const score = Math.max(adx / 3.8, ady);
                        if (score < minDist) minDist = score;
                    }

                    if (placedNodes.length === 0 || minDist > maxMinDist) {
                        maxMinDist = minDist;
                        bestX = xPct;
                        bestY = yPct;
                        bestDir = dir;
                        if (maxMinDist > 160) break;
                    }
                }

                placedNodes.push({ px: (bestX / 100) * width, py: (bestY / 100) * height });

                const wrapper = document.createElement('div');
                wrapper.className = 'node-wrapper';
                wrapper.style.left = `${bestX}%`;
                wrapper.style.top = `${bestY}%`;

                const fitClass = fitData.level.toLowerCase().replace(' ', '-');
                const isFlipped = bestY < 40; // Flip tooltip to bottom if node is in top 40% of screen

                wrapper.innerHTML = `
                    <div class="node-animator" style="animation: float ${8 + Math.random() * 6}s ease-in-out infinite;">
                        <div class="career-node ${bestDir}">
                            <div class="node-dot ${fitClass}"></div>
                            <div class="node-label">${career.name}</div>
                            <div class="node-tooltip ${isFlipped ? 'flipped' : ''}">
                                <div class="tooltip-header">
                                    <span class="tooltip-fit ${fitClass}">Phù hợp: ${fitData.label}</span>
                                    <span class="tooltip-code">Mã QĐ34: ${career.code}</span>
                                </div>
                                <p class="tooltip-desc"><strong>Thị trường:</strong> ${career.market}</p>
                                <p class="tooltip-salary"><strong>Lương TB:</strong> ${career.salary}</p>
                                <p class="tooltip-reason"><em>${reasons[fitData.level]}</em></p>
                                <button class="tooltip-btn" data-career="${career.name}">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                `;
                careerNodesContainer.appendChild(wrapper);

                const nodeBtn = wrapper.querySelector('.tooltip-btn');
                nodeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const careerName = nodeBtn.getAttribute('data-career');
                    selectCareer(careerName, wrapper.querySelector('.node-dot'), fitData.label);
                    location.href = `timeline.html?career=${encodeURIComponent(careerName)}`;
                });

                wrapper.querySelector('.node-dot').addEventListener('click', () => {
                    selectCareer(career.name, wrapper.querySelector('.node-dot'), fitData.label);
                });
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
